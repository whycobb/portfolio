window.bwVert = `varying vec2 f;void main(){f=uv;vec4 n=modelViewMatrix*vec4(position,1);gl_Position=projectionMatrix*n;}`;

window.bwFrag = `#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D m,v;uniform float x;uniform vec3 t;varying vec2 f;float s(vec2 f){f.x*=1.2047;f.y+=mod(floor(f.x),2.)*.5;f=abs(.5-mod(f,1.));return abs(max(f.x*1.5+f.y,f.y*2.)-1.);}void main(){float y=0.;vec3 r=t*2.;y=5.*pow(texture2D(m,vec2(f.x+x*.05,f.y+x*.1)).x*texture2D(m,vec2(f.x-x*.1,f.y-x*.05)).y,2.9);vec2 a=f*4.+.07*vec2(sin(x*.9+f.y*6.792),cos(x*.95+f.x*4.)),u;y+=y*(1.-smoothstep(0.,.2,s(a*6.)));y+=texture2D(v,f).x*.5+.2;u=texture2D(v,f).yz;y+=pow(mod(u.x-x,1.)*u.y,4.);gl_FragColor=vec4(y*r,1);}`;