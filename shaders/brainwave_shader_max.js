window.bwVert = `varying vec2 vUv;

	void main() {
		vUv = uv;

		vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
		gl_Position = projectionMatrix * modelViewPosition;
	}`;

window.bwFrag = `#ifdef GL_ES
	precision mediump float;
	#endif

	uniform sampler2D noiseTex; //https://i.imgur.com/geFMpNu.png
	uniform sampler2D edgeTex; //animGreen
	uniform float timeMsec;
	uniform vec3 inColor;
	varying vec2 vUv;

	// 1 on edges, 0 in middle
	//	is this faster than a texture lookup? No idea
	float hex(vec2 p) {
		p.x *= 0.57735*2.0 + 0.05;
		p.y += mod(floor(p.x), 2.0)*0.5;
		p = abs((0.5 - mod(p, 1.0)));
		return abs(max(p.x*1.5 + p.y, p.y*2.0) - 1.0);
	}

	void main(void){
		//st represents stpq, two sets of two dimensions for texture lookup. Think RGBA, XYZW, etc.
		//	but don't ask me why we don't just use uv
		vec2 st = vUv;
		float brightness = 0.0;
		vec3 color = inColor * 2.0; //note that color is multiplied by two

		//clean loop at 20 seconds
		brightness = 5. * pow(
			texture2D(noiseTex, vec2(vUv.x + timeMsec * 0.05, vUv.y + timeMsec * 0.1)).r
			* texture2D(noiseTex, vec2(vUv.x - timeMsec * 0.1, vUv.y - timeMsec * 0.05)).g
			, 2.9);

		//other half of st; I use this as a scrunched-down and ripply coord space to generate hexagons in
		vec2 pq = vUv * 4.0 + .07 * vec2( sin(timeMsec * 0.9 + vUv.y * 6.792), cos(timeMsec * 0.95 + vUv.x * 4.0));

		//convert pq space to hexagons. The second value in the smoothstep() determines line thickness, the multiplyer on pq determines hex size
		brightness += brightness * 1. * (1.0 - smoothstep(0.0, 0.2, hex(pq * 6.0)));

		//generate hexagons using alpha texture instead
		//	unfortunately, un-premultiplied alpha is broken on iOS, so we can't use this
		//	(I think the lookup was probably more expensive than the procedural approach, anyway)
		//brightness += brightness * (texture2D(noiseTex, (pq + vec2(0.5, 0.)) * vec2(3.64, 6.))).a;

		//add a ring around the outer edge, plus some background brightness so we don't see any pitch-black
		//brightness += pow(2.2 * distance( vUv, vec2(0.5)), 3.) / 1.3 + 0.2;

		//or add a ring around the geometry with a mask
		brightness += texture2D(edgeTex, vUv).r * 0.5 + 0.2;

		vec2 rim = texture2D(edgeTex, vUv).gb;
		brightness += pow(mod(rim.x - timeMsec / 1.0, 1.0) * rim.y, 4.0);	//this is where the magic happens?



		//brightness = floor(rim.x + timeMsec / 1.0) * 2.0 * rim.y;


		//bring in color, modulated by brightness, for the shader output
		gl_FragColor = vec4(brightness * color,1.0);
//		gl_FragColor = vec4(texture2D(noiseTex, st).rgb, 0.5);
//		gl_FragColor = vec4(1.0, 0.67, 0.2, 1.0);
	}`;