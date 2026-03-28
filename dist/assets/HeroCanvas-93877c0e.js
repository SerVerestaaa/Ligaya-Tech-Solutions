import{O as le,P as ue,M as ce,S as C,U as Q,C as R,V as b,W as j,H as V,a as P,A as D,b as he,N as fe,c as me,L as Y,R as ee,r as o,e as W,u as k,d as de,f as y,_ as O,g as pe,h as ve,i as te,j as xe,k as ge,l as n,m as be,n as ye}from"./index-d578c4d0.js";var Te=Object.defineProperty,_e=(r,e,t)=>e in r?Te(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,z=(r,e,t)=>(_e(r,typeof e!="symbol"?e+"":e,t),t);class U{constructor(){z(this,"enabled",!0),z(this,"needsSwap",!0),z(this,"clear",!1),z(this,"renderToScreen",!1)}setSize(e,t){}render(e,t,s,a,i){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}class re{constructor(e){z(this,"camera",new le(-1,1,1,-1,0,1)),z(this,"geometry",new ue(2,2)),z(this,"mesh"),this.mesh=new ce(this.geometry,e)}get material(){return this.mesh.material}set material(e){this.mesh.material=e}dispose(){this.mesh.geometry.dispose()}render(e){e.render(this.mesh,this.camera)}}var we=Object.defineProperty,Me=(r,e,t)=>e in r?we(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,L=(r,e,t)=>(Me(r,typeof e!="symbol"?e+"":e,t),t);class G extends U{constructor(e,t="tDiffuse"){super(),L(this,"textureID"),L(this,"uniforms"),L(this,"material"),L(this,"fsQuad"),this.textureID=t,e instanceof C?(this.uniforms=e.uniforms,this.material=e):(this.uniforms=Q.clone(e.uniforms),this.material=new C({defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new re(this.material)}render(e,t,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.fsQuad.dispose(),this.material.dispose()}}const N={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`
    varying vec2 vUv;

    void main() {

    	vUv = uv;
    	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`
    uniform float opacity;

    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    void main() {

    	vec4 texel = texture2D( tDiffuse, vUv );
    	gl_FragColor = opacity * texel;

    }
  `},Se={shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new R(0)},defaultOpacity:{value:0}},vertexShader:`
    varying vec2 vUv;

    void main() {

    	vUv = uv;

    	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec3 defaultColor;
    uniform float defaultOpacity;
    uniform float luminosityThreshold;
    uniform float smoothWidth;

    varying vec2 vUv;

    void main() {

    	vec4 texel = texture2D( tDiffuse, vUv );

    	vec3 luma = vec3( 0.299, 0.587, 0.114 );

    	float v = dot( texel.xyz, luma );

    	vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

    	float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

    	gl_FragColor = mix( outputColor, texel, alpha );

    }
  `};var Ce=Object.defineProperty,Fe=(r,e,t)=>e in r?Ce(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,X=(r,e,t)=>(Fe(r,typeof e!="symbol"?e+"":e,t),t);const Pe=(()=>{const r=class extends U{constructor(t,s,a,i){super(),this.strength=s!==void 0?s:1,this.radius=a,this.threshold=i,this.resolution=t!==void 0?new b(t.x,t.y):new b(256,256),this.clearColor=new R(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let l=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);this.renderTargetBright=new j(l,u,{type:V}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const m=new j(l,u,{type:V});m.texture.name="UnrealBloomPass.h"+f,m.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(m);const d=new j(l,u,{type:V});d.texture.name="UnrealBloomPass.v"+f,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),l=Math.round(l/2),u=Math.round(u/2)}const h=Se;this.highPassUniforms=Q.clone(h.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new C({uniforms:this.highPassUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,defines:{}}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];l=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[f])),this.separableBlurMaterials[f].uniforms.texSize.value=new b(l,u),l=Math.round(l/2),u=Math.round(u/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=s,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.needsUpdate=!0;const p=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=p,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const x=N;this.copyUniforms=Q.clone(x.uniforms),this.copyUniforms.opacity.value=1,this.materialCopy=new C({uniforms:this.copyUniforms,vertexShader:x.vertexShader,fragmentShader:x.fragmentShader,blending:D,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new R,this.oldClearAlpha=1,this.basic=new he,this.fsQuad=new re(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.materialCopy.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,s){let a=Math.round(t/2),i=Math.round(s/2);this.renderTargetBright.setSize(a,i);for(let l=0;l<this.nMips;l++)this.renderTargetsHorizontal[l].setSize(a,i),this.renderTargetsVertical[l].setSize(a,i),this.separableBlurMaterials[l].uniforms.texSize.value=new b(a,i),a=Math.round(a/2),i=Math.round(i/2)}render(t,s,a,i,l){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const u=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),l&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=a.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let h=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=h.texture,this.separableBlurMaterials[c].uniforms.direction.value=r.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=r.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this.fsQuad.render(t),h=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,l&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(a),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=u}getSeperableBlurMaterial(t){return new C({defines:{KERNEL_RADIUS:t,SIGMA:t},uniforms:{colorTexture:{value:null},texSize:{value:new b(.5,.5)},direction:{value:new b(.5,.5)}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new C({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};let e=r;return X(e,"BlurDirectionX",new b(1,0)),X(e,"BlurDirectionY",new b(0,1)),e})();var ze=Object.defineProperty,Re=(r,e,t)=>e in r?ze(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,$=(r,e,t)=>(Re(r,typeof e!="symbol"?e+"":e,t),t);class J extends U{constructor(e,t){super(),$(this,"scene"),$(this,"camera"),$(this,"inverse"),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,s){const a=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let l,u;this.inverse?(l=0,u=1):(l=1,u=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),i.buffers.stencil.setFunc(a.ALWAYS,l,4294967295),i.buffers.stencil.setClear(u),i.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(a.EQUAL,1,4294967295),i.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),i.buffers.stencil.setLocked(!0)}}class Be extends U{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}var Ee=Object.defineProperty,Ae=(r,e,t)=>e in r?Ee(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,g=(r,e,t)=>(Ae(r,typeof e!="symbol"?e+"":e,t),t);class je{constructor(e,t){if(g(this,"renderer"),g(this,"_pixelRatio"),g(this,"_width"),g(this,"_height"),g(this,"renderTarget1"),g(this,"renderTarget2"),g(this,"writeBuffer"),g(this,"readBuffer"),g(this,"renderToScreen"),g(this,"passes",[]),g(this,"copyPass"),g(this,"clock"),this.renderer=e,t===void 0){const s={minFilter:Y,magFilter:Y,format:ee},a=e.getSize(new b);this._pixelRatio=e.getPixelRatio(),this._width=a.width,this._height=a.height,t=new j(this._width*this._pixelRatio,this._height*this._pixelRatio,s),t.texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,N===void 0&&console.error("THREE.EffectComposer relies on CopyShader"),G===void 0&&console.error("THREE.EffectComposer relies on ShaderPass"),this.copyPass=new G(N),this.copyPass.material.blending=fe,this.clock=new me}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let s=!1;const a=this.passes.length;for(let i=0;i<a;i++){const l=this.passes[i];if(l.enabled!==!1){if(l.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),l.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),l.needsSwap){if(s){const u=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(u.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(u.EQUAL,1,4294967295)}this.swapBuffers()}J!==void 0&&(l instanceof J?s=!0:l instanceof Be&&(s=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new b);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const s=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(s,a),this.renderTarget2.setSize(s,a);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(s,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}var De=Object.defineProperty,Ue=(r,e,t)=>e in r?De(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,F=(r,e,t)=>(Ue(r,typeof e!="symbol"?e+"":e,t),t);class Le extends U{constructor(e,t,s,a,i=0){super(),F(this,"scene"),F(this,"camera"),F(this,"overrideMaterial"),F(this,"clearColor"),F(this,"clearAlpha"),F(this,"clearDepth",!1),F(this,"_oldClearColor",new R),this.scene=e,this.camera=t,this.overrideMaterial=s,this.clearColor=a,this.clearAlpha=i,this.clear=!0,this.needsSwap=!1}render(e,t,s){let a=e.autoClear;e.autoClear=!1;let i,l=null;this.overrideMaterial!==void 0&&(l=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor&&(e.getClearColor(this._oldClearColor),i=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor&&e.setClearColor(this._oldClearColor,i),this.overrideMaterial!==void 0&&(this.scene.overrideMaterial=l),e.autoClear=a}}const Ie={uniforms:{tDiffuse:{value:null}},vertexShader:`
    varying vec2 vUv;

    void main() {

    	vUv = uv;
    	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    void main() {

    	vec4 tex = texture2D( tDiffuse, vUv );

    	#ifdef LinearTosRGB
    		gl_FragColor = LinearTosRGB( tex );
    	#else
    		gl_FragColor = sRGBTransferOETF( tex );
    	#endif

    }
  `},Ve=o.forwardRef(({children:r,multisamping:e=8,renderIndex:t=1,disableRender:s,disableGamma:a,disableRenderPass:i,depthBuffer:l=!0,stencilBuffer:u=!1,anisotropy:h=1,encoding:c,type:p,...x},f)=>{o.useMemo(()=>W({EffectComposer:je,RenderPass:Le,ShaderPass:G}),[]);const m=o.useRef(null);o.useImperativeHandle(f,()=>m.current,[]);const{scene:d,camera:_,gl:w,size:T,viewport:B}=k(),[M]=o.useState(()=>{const v=new j(T.width,T.height,{type:p||V,format:ee,depthBuffer:l,stencilBuffer:u,anisotropy:h});return p===de&&c!=null&&("colorSpace"in v?v.texture.colorSpace=c:v.texture.encoding=c),v.samples=e,v});o.useEffect(()=>{var v,K;(v=m.current)==null||v.setSize(T.width,T.height),(K=m.current)==null||K.setPixelRatio(B.dpr)},[w,T,B.dpr]),y(()=>{var v;s||(v=m.current)==null||v.render()},t);const S=[];return i||S.push(o.createElement("renderPass",{key:"renderpass",attach:`passes-${S.length}`,args:[d,_]})),a||S.push(o.createElement("shaderPass",{attach:`passes-${S.length}`,key:"gammapass",args:[Ie]})),o.Children.forEach(r,v=>{v&&S.push(o.cloneElement(v,{key:S.length,attach:`passes-${S.length}`}))}),o.createElement("effectComposer",O({ref:m,args:[w,M]},x),S)}),Oe=()=>parseInt(pe.replace(/\D+/g,"")),se=Oe();var $e=`#define GLSLIFY 1
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}`;class He extends ve{constructor(e={}){super(e),this.setValues(e),this._time={value:0},this._distort={value:.4},this._radius={value:1}}onBeforeCompile(e){e.uniforms.time=this._time,e.uniforms.radius=this._radius,e.uniforms.distort=this._distort,e.vertexShader=`
      uniform float time;
      uniform float radius;
      uniform float distort;
      ${$e}
      ${e.vertexShader}
    `,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`
        float updateTime = time / 50.0;
        float noise = snoise(vec3(position / 2.0 + updateTime * 5.0));
        vec3 transformed = vec3(position * (noise * pow(distort, 2.0) + radius));
        `)}get time(){return this._time.value}set time(e){this._time.value=e}get distort(){return this._distort.value}set distort(e){this._distort.value=e}get radius(){return this._radius.value}set radius(e){this._radius.value=e}}const Qe=o.forwardRef(({speed:r=1,...e},t)=>{const[s]=o.useState(()=>new He);return y(a=>s&&(s.time=a.clock.elapsedTime*r)),o.createElement("primitive",O({object:s,ref:t,attach:"material"},e))});function Ge(r,e){const t=r+"Geometry";return o.forwardRef(({args:s,children:a,...i},l)=>{const u=o.useRef(null);return o.useImperativeHandle(l,()=>u.current),o.useLayoutEffect(()=>void(e==null?void 0:e(u.current))),o.createElement("mesh",O({ref:u},i),o.createElement(t,{attach:"geometry",args:s}),a)})}const Ne=Ge("torus"),ie=o.forwardRef(({children:r,enabled:e=!0,speed:t=1,rotationIntensity:s=1,floatIntensity:a=1,floatingRange:i=[-.1,.1],autoInvalidate:l=!1,...u},h)=>{const c=o.useRef(null);o.useImperativeHandle(h,()=>c.current,[]);const p=o.useRef(Math.random()*1e4);return y(x=>{var f,m;if(!e||t===0)return;l&&x.invalidate();const d=p.current+x.clock.elapsedTime;c.current.rotation.x=Math.cos(d/4*t)/8*s,c.current.rotation.y=Math.sin(d/4*t)/8*s,c.current.rotation.z=Math.sin(d/4*t)/20*s;let _=Math.sin(d/4*t)/10;_=te.mapLinear(_,-.1,.1,(f=i==null?void 0:i[0])!==null&&f!==void 0?f:-.1,(m=i==null?void 0:i[1])!==null&&m!==void 0?m:.1),c.current.position.y=_*a,c.current.updateMatrix()}),o.createElement("group",u,o.createElement("group",{ref:c,matrixAutoUpdate:!1},r))});class We extends C{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${se>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const ke=r=>new P().setFromSpherical(new xe(r,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),Ke=o.forwardRef(({radius:r=100,depth:e=50,count:t=5e3,saturation:s=0,factor:a=4,fade:i=!1,speed:l=1},u)=>{const h=o.useRef(),[c,p,x]=o.useMemo(()=>{const m=[],d=[],_=Array.from({length:t},()=>(.5+.5*Math.random())*a),w=new R;let T=r+e;const B=e/t;for(let M=0;M<t;M++)T-=B*Math.random(),m.push(...ke(T).toArray()),w.setHSL(M/t,s,.9),d.push(w.r,w.g,w.b);return[new Float32Array(m),new Float32Array(d),new Float32Array(_)]},[t,e,a,r,s]);y(m=>h.current&&(h.current.uniforms.time.value=m.clock.elapsedTime*l));const[f]=o.useState(()=>new We);return o.createElement("points",{ref:u},o.createElement("bufferGeometry",null,o.createElement("bufferAttribute",{attach:"attributes-position",args:[c,3]}),o.createElement("bufferAttribute",{attach:"attributes-color",args:[p,3]}),o.createElement("bufferAttribute",{attach:"attributes-size",args:[x,1]})),o.createElement("primitive",{ref:h,object:f,attach:"material",blending:D,"uniforms-fade-value":i,depthWrite:!1,transparent:!0,vertexColors:!0}))});class Ye extends C{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength * vOpacity);
          #include <tonemapping_fragment>
          #include <${se>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(e){this.uniforms.pixelRatio.value=e}}const ae=r=>r&&r.constructor===Float32Array,Xe=r=>[r.r,r.g,r.b],oe=r=>r instanceof b||r instanceof P||r instanceof ge,ne=r=>Array.isArray(r)?r:oe(r)?r.toArray():[r,r,r];function E(r,e,t){return o.useMemo(()=>{if(e!==void 0){if(ae(e))return e;if(e instanceof R){const s=Array.from({length:r*3},()=>Xe(e)).flat();return Float32Array.from(s)}else if(oe(e)||Array.isArray(e)){const s=Array.from({length:r*3},()=>ne(e)).flat();return Float32Array.from(s)}return Float32Array.from({length:r},()=>e)}return Float32Array.from({length:r},t)},[e])}const Z=o.forwardRef(({noise:r=1,count:e=100,speed:t=1,opacity:s=1,scale:a=1,size:i,color:l,children:u,...h},c)=>{o.useMemo(()=>W({SparklesImplMaterial:Ye}),[]);const p=o.useRef(null),x=k(M=>M.viewport.dpr),f=ne(a),m=o.useMemo(()=>Float32Array.from(Array.from({length:e},()=>f.map(te.randFloatSpread)).flat()),[e,...f]),d=E(e,i,Math.random),_=E(e,s),w=E(e,t),T=E(e*3,r),B=E(l===void 0?e*3:e,ae(l)?l:new R(l),()=>1);return y(M=>{p.current&&p.current.material&&(p.current.material.time=M.clock.elapsedTime)}),o.useImperativeHandle(c,()=>p.current,[]),o.createElement("points",O({key:`particle-${e}-${JSON.stringify(a)}`},h,{ref:p}),o.createElement("bufferGeometry",null,o.createElement("bufferAttribute",{attach:"attributes-position",args:[m,3]}),o.createElement("bufferAttribute",{attach:"attributes-size",args:[d,1]}),o.createElement("bufferAttribute",{attach:"attributes-opacity",args:[_,1]}),o.createElement("bufferAttribute",{attach:"attributes-speed",args:[w,1]}),o.createElement("bufferAttribute",{attach:"attributes-color",args:[B,3]}),o.createElement("bufferAttribute",{attach:"attributes-noise",args:[T,3]})),u||o.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:x,depthWrite:!1}))});W({UnrealBloomPass:Pe});function Je(){const r=o.useRef(),e=o.useRef();return y(({clock:t})=>{const s=t.getElapsedTime();r.current&&(r.current.rotation.x=s*.12,r.current.rotation.y=s*.18),e.current&&(e.current.rotation.x=s*-.08,e.current.rotation.z=s*.06)}),n.jsx(ie,{speed:1.35,rotationIntensity:.35,floatIntensity:.85,children:n.jsxs("group",{ref:r,children:[n.jsxs("mesh",{children:[n.jsx("icosahedronGeometry",{args:[1.28,1]}),n.jsx(Qe,{color:"#06051c",emissive:"#0a6b82",emissiveIntensity:.11,roughness:.22,metalness:.88,distort:.4,speed:2.2})]}),n.jsxs("mesh",{ref:e,scale:1.06,children:[n.jsx("icosahedronGeometry",{args:[1.28,1]}),n.jsx("meshBasicMaterial",{color:"#7B2FFF",wireframe:!0,transparent:!0,opacity:.22,depthWrite:!1})]})]})})}function I({radius:r,tube:e,speed:t,tilt:s,color:a}){const i=o.useRef();return y(({clock:l})=>{i.current&&(i.current.rotation.z=l.getElapsedTime()*t)}),n.jsx("mesh",{ref:i,rotation:[s,0,0],children:n.jsx(Ne,{args:[r,e,12,64],children:n.jsx("meshBasicMaterial",{color:a,transparent:!0,opacity:.38,blending:D,depthWrite:!1})})})}function A({position:r,rotation:e,color:t,scale:s}){const a=o.useRef();return y(({clock:i})=>{if(!a.current)return;const l=i.getElapsedTime();a.current.rotation.x=l*.31+e[0],a.current.rotation.y=l*.22+e[1]}),n.jsx(ie,{speed:1.8,rotationIntensity:.6,floatIntensity:1.4,children:n.jsxs("mesh",{ref:a,position:r,scale:s,children:[n.jsx("octahedronGeometry",{args:[1,0]}),n.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:.22,metalness:.88,roughness:.22,transparent:!0,opacity:.92})]})})}function q({position:r,color:e,scale:t=1}){const s=o.useRef();return y(({clock:a})=>{s.current&&(s.current.rotation.y=a.getElapsedTime()*.15)}),n.jsxs("mesh",{ref:s,position:r,scale:t,children:[n.jsx("icosahedronGeometry",{args:[1,0]}),n.jsx("meshBasicMaterial",{color:e,wireframe:!0,transparent:!0,opacity:.35,blending:D,depthWrite:!1})]})}function H({count:r,spread:e,color:t,size:s,speed:a}){const i=o.useMemo(()=>{const u=new Float32Array(r*3);for(let h=0;h<r;h++)u[h*3]=(Math.random()-.5)*e,u[h*3+1]=(Math.random()-.5)*e,u[h*3+2]=(Math.random()-.5)*e;return u},[r,e]),l=o.useRef();return y(({clock:u})=>{l.current&&(l.current.rotation.y=u.getElapsedTime()*a)}),n.jsxs("points",{ref:l,children:[n.jsx("bufferGeometry",{children:n.jsx("bufferAttribute",{attach:"attributes-position",count:r,array:i,itemSize:3})}),n.jsx("pointsMaterial",{size:s,color:t,transparent:!0,opacity:.65,sizeAttenuation:!0,depthWrite:!1,blending:D})]})}function Ze(){const{camera:r,mouse:e}=k();return y(()=>{const t=e.x*.55,s=e.y*.35;r.position.x+=(t-r.position.x)*.045,r.position.y+=(s-r.position.y)*.045,r.lookAt(0,0,0)}),null}function qe({quality:r}){const e=r==="low",t=e?1200:4500,s=e?80:280;return n.jsxs(n.Fragment,{children:[n.jsx(Ze,{}),n.jsx("color",{attach:"background",args:["#03020f"]}),n.jsx("ambientLight",{intensity:.22}),n.jsx("spotLight",{position:[8,10,6],angle:.38,penumbra:.88,intensity:e?14:22,color:"#7ec8d4",distance:45,decay:2}),n.jsx("spotLight",{position:[-8,-6,4],angle:.48,penumbra:1,intensity:e?11:18,color:"#9b7fcf",distance:40,decay:2}),n.jsx("pointLight",{position:[0,5,-6],color:"#FF2FBB",intensity:e?.35:.55,distance:20}),n.jsx(Ke,{radius:95,depth:60,count:t,factor:2.8,saturation:.35,fade:!0,speed:.55}),n.jsx(Z,{count:e?24:56,scale:14,size:1.2,speed:.32,opacity:.22,color:"#00D4FF"}),n.jsx(Z,{count:e?18:40,scale:12,size:1,speed:.25,opacity:.18,color:"#FF2FBB"}),n.jsx(H,{count:s,spread:22,color:"#00D4FF",size:.038,speed:.018}),n.jsx(H,{count:Math.floor(s*.7),spread:24,color:"#7B2FFF",size:.03,speed:-.012}),n.jsx(H,{count:Math.floor(s*.45),spread:18,color:"#FF2FBB",size:.022,speed:.009}),n.jsx(Je,{}),n.jsx(I,{radius:2.35,tube:.014,speed:.32,tilt:.42,color:"#00D4FF"}),n.jsx(I,{radius:3.05,tube:.011,speed:-.22,tilt:.95,color:"#7B2FFF"}),n.jsx(I,{radius:3.85,tube:.009,speed:.14,tilt:1.42,color:"#FF2FBB"}),n.jsx(I,{radius:4.55,tube:.006,speed:.09,tilt:2.1,color:"#00FFB2"}),n.jsx(q,{position:[-5,2.5,-4],color:"#00D4FF",scale:.65}),n.jsx(q,{position:[5.5,-2,-3],color:"#7B2FFF",scale:.55}),!e&&n.jsxs(n.Fragment,{children:[n.jsx(A,{position:[4.2,2.1,-1.8],rotation:[.5,.2,0],color:"#00D4FF",scale:.22}),n.jsx(A,{position:[-4.6,1.4,-.5],rotation:[.8,.1,.3],color:"#7B2FFF",scale:.19}),n.jsx(A,{position:[3.6,-2.8,.8],rotation:[.2,.6,.1],color:"#FF2FBB",scale:.16})]}),n.jsx(A,{position:[-3.2,3.4,-2.5],rotation:[.3,.4,0],color:"#00FFB2",scale:.14}),n.jsx(A,{position:[1.2,4.1,-3],rotation:[.1,.9,.2],color:"#00D4FF",scale:.12})]})}function tt({quality:r}){const e=r==="low"?[1,1]:[1,1.5];return n.jsx(be,{camera:{position:[0,.15,7.2],fov:52},dpr:e,gl:{antialias:r!=="low",alpha:!1,powerPreference:"high-performance",toneMapping:ye,toneMappingExposure:.88},style:{background:"#03020f"},children:n.jsxs(o.Suspense,{fallback:null,children:[n.jsx(qe,{quality:r}),r!=="low"&&n.jsx(Ve,{disableGamma:!0,children:n.jsx("unrealBloomPass",{attachArray:"passes",args:[void 0,.48,.36,.42]})})]})})}export{tt as default};
