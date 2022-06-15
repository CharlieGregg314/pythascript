console.log(`
%c--==pythascript==--%c
this is a stupid attempt to make
javascript a bit more bareable:D`,"background:#192; color: #efe; font-size:32pt;","background:#2a7; color: #ded; font-size:19pt;");const _PYTHASCRIPT_MODULES=new Set;setTimeout(function(){let mods="";for(const mod of _PYTHASCRIPT_MODULES){mods+=mod+", "}console.log(`%cLoaded modules: (${mods.slice(0,-2)})`,"color: #cfc;")},100);_PYTHASCRIPT_MODULES.add("pythascript.js")
/**
 * Iterates over an iterable `value`, calling `f` with spreading arguments for each value
 * @param {Iterable} value iterable to iterate over
 * @param {Function} f function to run for each value
 */;function spread_for(value,f){value.forEach(v=>{spread_call(v,f)})}
/**
 * Spreads areguments over a function if it accepts multiple.
 * @param {*} value value to call with
 * @param {Function} f function to attempt to spread over
 * @returns {*} returns the same value as f
 */function spread_call(value,f){
// arguments > 1
if(f.length>1){return f(...value)}else{return f(value)}}_PYTHASCRIPT_MODULES.add("spread.js")
/**
 * Creates a range of numbers, can be used with a for of loop
 * @param {Number} start start of range, or stop if only argument
 * @param {Number} stop end of range
 * @param {Number} step difference between values
 */;function range(start,stop,step){if(stop===undefined){stop=start;start=0}if(step===undefined){step=1}let generated=[];let at=start;while(at<stop){generated.push(at);at+=step}return generated}
/**
 * Creates an object with a range generator
 * @param {Number} start start of range, or stop if only argument
 * @param {Number} stop end of range
 * @param {Number} step difference between values
 */function rangeg(start,stop,step){return{// note immediately invoked function expression generator
gen:function*(start,stop,step=1){if(stop===undefined){stop=start;start=0}if(step===undefined){step=1}let at=start;while(at<stop){yield at;at+=step}}(start,stop,step),next:function(){return this.gen.next().value},valueOf:function(){let rest=[];let nxt=this.gen.next();while(!nxt.done){rest.push(nxt.value);nxt=this.gen.next()}return rest}}}
/**
 * Creates an object of numbers which can be used with a forin loop
 * @param {Number} start start of range, or stop if only argument
 * @param {Number} stop end of range
 * @param {Number} step difference between values
 */function rangef(start,stop,step){let r=range(start,stop,step);let list=[];for(let i=0;i<r.length;i++){list[r[i]]=0}return list}
/**
 * Iterates over a range of numbers
 * @param {Number} start start of range, or stop if only argument
 * @param {Number} stop end of range
 * @param {Number} step difference between values
 * @param {Function} f function to run for each value, values will be passed as argument
 */function rangei(f,start,stop,step){range(start,stop,step).forEach(f)}_PYTHASCRIPT_MODULES.add("range.js")
/**
 * Can detect operators: x|y x&y x^y ~x -x
 */;class BinaryOpOver{static _OP_OVER_VALUES={};static _OP_OVER_NEXT_ID=0;static _OP_OVER_MAX_BITS=8;static _OP_OVER_NAMES={"|":"op_bit_or","&":"op_bit_and","^":"op_bit_xor","~":"op_bit_inv","-u":"op_neg"};valueOf(){
/**
         * ENCODING METHOD:
         *  if parity
         *      id twice
         *      set of 0's
         *      set of 1's
         *      another 1
         *  else
         *      set of 0's
         *      set of 1's
         *      id twice
         *      another 0
         *  a final 1
         * 
         * DECODING METHOD:
         * The set of 0's and 1's allows for the other parities id to remain intact under any of the operations
         * The extra 1 or 0 allows for detection between | and & as the only difference occurs when there is only 1 input
         * The invert operator will make the result negative, and subtract one (removing the second check bit), and from there can be reversed.
         * The negate operator will leave the result negative, and hence is easy to detect.
         */
let bits="0b";let id=BinaryOpOver._OP_OVER_NEXT_ID;BinaryOpOver._OP_OVER_NEXT_ID+=1;BinaryOpOver._OP_OVER_NEXT_ID%=1<<BinaryOpOver._OP_OVER_MAX_BITS;let parity=id%2;BinaryOpOver._OP_OVER_VALUES[id]=this;if(parity){bits+=id.toString(2).padStart(BinaryOpOver._OP_OVER_MAX_BITS,"0").repeat(2);bits+="0".repeat(BinaryOpOver._OP_OVER_MAX_BITS);bits+="1".repeat(BinaryOpOver._OP_OVER_MAX_BITS)}else{bits+="0".repeat(BinaryOpOver._OP_OVER_MAX_BITS);bits+="1".repeat(BinaryOpOver._OP_OVER_MAX_BITS);bits+=id.toString(2).padStart(BinaryOpOver._OP_OVER_MAX_BITS,"0").repeat(2)}bits+=`${id%2}1`;return BigInt(bits)}}function opbx(value){let bits=value.toString(2).padStart(BinaryOpOver._OP_OVER_MAX_BITS*4+2,"0");let check=bits.slice(-2);const get_val=(id1,id2,op)=>{return BinaryOpOver._OP_OVER_VALUES[id1][BinaryOpOver._OP_OVER_NAMES[op]](BinaryOpOver._OP_OVER_VALUES[id2])};const get_slice=(p1,p2)=>{return Number("0b"+bits.slice(p1*BinaryOpOver._OP_OVER_MAX_BITS,p2*BinaryOpOver._OP_OVER_MAX_BITS))};const do_ids=(id1,id2,op)=>{let real_dist=id2-id1;let max=1<<BinaryOpOver._OP_OVER_MAX_BITS;if((real_dist+max)%max>max>>1){ret_value=get_val(id2,id1,op);// reversed order
}else{ret_value=get_val(id1,id2,op)}};let ret_value;if(bits.includes("-")){// must be ~,-
let parity=check[1]=="1";if(check[1]=="1"){// must be -
bits=value.toString(2).slice(1).padStart(BinaryOpOver._OP_OVER_MAX_BITS*4+2,"0");let id=get_slice(2-parity*2,3-parity*2);do_ids(id,id,"-u")}else{bits=(value+1n).toString(2).slice(1).padStart(BinaryOpOver._OP_OVER_MAX_BITS*4+2,"0");let id=get_slice(2-parity*2,3-parity*2);do_ids(id,id,"~")}}else if(check[0]=="1"&&check[1]=="1"){// must be |
let id1=get_slice(0,1);let id2=get_slice(2,3);do_ids(id1,id2,"|")}else if(check[0]=="1"){// must be ^
let id1=get_slice(0,1);let id2=get_slice(2,3);do_ids(id1,id2,"^")}else{// must be &
let id1=get_slice(1,2);let id2=get_slice(3,4);do_ids(id1,id2,"&")}return ret_value}
/**
 * Can detect operators: x+y x-y x*y x/2n x^y x|y
 * x<<y [limited by memory usage, probably unsafe]
 */class OpOver{static _OP_OVER_VALUES={};static _OP_OVER_NEXT_ID=0;static _OP_OVER_MAX_BITS=8;static _OP_OVER_NAMES={"+":"op_add","*":"op_mul","-":"op_sub","/":"op_div_2n","|":"op_bit_or","^":"op_bit_xor","~":"op_bit_inv","-u":"op_neg","<<":"op_bit_lshift"};static _OP_OVER_USE_LSHIFT=false;valueOf(){
/** 
         * ENCODING METHOD: (much simpler than that of BinaryOpOver, although decoding is more complex)
         *  a 1
         *  (id + 1) 0's
         *  another 1
         * 
         * DECODING METHOD:
         * When multiplied, this results in a larger bit, which can be ignored, 
         * and since the bits in the middle are multiplied by 1, 
         * their values can be extracted directly.
         * When added, the two higher bits will indicate ids, and the 2's place bit will indicate addition.
         * When subtracted, one of two things can happen.
         * 1: the result is positive, the number of digits in total can tell one id, the number of 0's can tell the other.
         * 2: the result is negative, the same is true after removing the minus sign.
         * When divided by 2n, the last bit will dissapear, and there will only be one bit remaining, this can be converted into the id.
         * When xorred, the last bit will dissapear, and there will be two seperate bits remaining, these can be converted into the ids.
         * When orred, the last bit will remain, and the other two can be converted into the ids.
         * When negated, the result will be negative, but the bits will remain the same, this can be converted into the id.
         * When inverted, the result will be negative, but the last bit will be 0, this can be converted into the id.
         * * When bit shifted, the result can be obtained by noting the distance of 0's, this can interefere with xor, and is memory intensive.
         */
let bits="0b";let id=OpOver._OP_OVER_NEXT_ID;OpOver._OP_OVER_NEXT_ID+=3;// stop bleeding and make sure - always creates a sequence of two 1's
OpOver._OP_OVER_NEXT_ID%=1<<OpOver._OP_OVER_MAX_BITS;OpOver._OP_OVER_VALUES[id]=this;bits+="1";bits+="0".repeat(id+1);// + 1 to prevent bleeding (+0 fails for small |,*)
bits+="1";return BigInt(bits)}}function opx(value){let bits=value.toString(2);let check=bits.slice(-2);let ret_value;const get_val=(id1,id2,op)=>{return OpOver._OP_OVER_VALUES[id1][OpOver._OP_OVER_NAMES[op]](OpOver._OP_OVER_VALUES[id2])};const do_ids=(id1,id2,op)=>{let real_dist=id2-id1;let max=1<<OpOver._OP_OVER_MAX_BITS;if((real_dist+max)%max>max>>1){ret_value=get_val(id2,id1,op);// reversed order
}else{ret_value=get_val(id1,id2,op)}};if(check[0]=="1"&&bits.length>2){// must be +,~ (length is more than 2 so /2n doesn't interfere)
if(bits[0]=="-"){// must be ~
let id=bits.length-4;do_ids(id,id,"~")}else{let id1=bits.length-3;// first bit must be a one
let id2=id1-bits.indexOf("1",1);// the next bit
do_ids(id1,id2,"+")}}else if(check[1]=="0"){// must be -,^,/2n,<<
let ones=(bits.match(/1/g)||[]).length;if(ones==1){// must be /2n
let id=bits.length-2;do_ids(id,id,"/")}else if(ones==2&&!bits.includes("11")&&OpOver._OP_OVER_USE_LSHIFT){// must be <<
let id1=bits.indexOf("1",1)-2;let id2=Number(bits.length-bits.indexOf("1",1)-1).toString(2).length-3;do_ids(id1,id2,"<<")}else if(bits[0]=="-"){// must be -
let id1=(bits.match(/0/g)||[]).length-2;let id2=bits.length-3;do_ids(id1,id2,"-")}else{if(bits.includes("11")){// must be -
let id1=(bits.match(/0/g)||[]).length-2;let id2=bits.length-2;do_ids(id1,id2,"-")}else{// must be ^
let id2=bits.length-3;// first bit must be a one
let id1=id2-bits.indexOf("1",1);// the next bit
do_ids(id1,id2,"^")}}}else{// check = "01", must be *,|,-u
let ones=(bits.match(/1/g)||[]).length;if(bits[0]=="-"&&ones==2){// must be -u
let id=bits.length-4;do_ids(id,id,"-u")}else if(ones==3){// must be |
let id1=bits.length-3;// first bit must be a one
let id2=id1-bits.indexOf("1",1);// the next bit
do_ids(id1,id2,"|")}else{// must be *
let id1=bits.length-3-bits.indexOf("1",1);let id2=bits.length-3-bits.indexOf("1",bits.indexOf("1",1)+1);do_ids(id1,id2,"*")}}return ret_value}
/**
 * Can buffer values for a simpler version of operator overloading.
 */class OpOverBuffer{static _OP_OVER_CURR_BUFFER=undefined;constructor(value){this.value=value}valueOf(){OpOverBuffer._OP_OVER_CURR_BUFFER=this}}
/**
 * Function for creating action types
 * @param {String} action 
 * @returns {Function} Action Constructor
 */function OpOverBufferAction(action){return function(value){return{action:action,value:value,valueOf:function(){OpOverBuffer._OP_OVER_CURR_BUFFER.buffer(this)}}}}_PYTHASCRIPT_MODULES.add("over.js")
/**
 * Generates a comprehension, if `if_` is omitted, always uses `for_`
 * if `else_` is omitted, and `if_` is falsey then do not add anything.
 * Arguments are supplied via parameter deconstructing.
 * @param {[]|{}|""|0|Set} type type of comprehension, one of [], {}, new Set(), "" or 0.
 * @param {Function} for_ function to be run for each iteration.
 * @param {Array} in_ array of values to iterate over.
 * @param {Function} if_ function must return truthy value for `for_` to be run.
 * @param {Function} else_ function will be run instead of `for_` if `if_` is falsey.
 * @param {Function} while_ function that can end execution by returning falsey when given the output value.
 * @param {String} num_op operator to be used with number comprehensions, one of "+", "-", "*" or "/".
 * @returns {Array|Object|String|Number|Set} The completed comprehension
 */;function comp({type,for_,in_,if_,else_,while_,num_op="+"}){let result=type;
// start multiplication and division at 1
if(/[*/]/.test(num_op)&&type==0){result=1}
// while statement breaking
let broke=false;
// add the value to the result
const add=value=>{if(while_!==undefined){if(!while_(value)){broke=true;return}}if(type instanceof Array){result.push(value)}else if(type instanceof Set){result.add(value)}else if(typeof type=="number"){if(num_op=="+"){result+=value}else if(num_op=="-"){result-=value}else if(num_op=="*"){result*=value}else if(num_op=="/"){result/=value}}else if(typeof type=="string"){result+=value.toString()}else{result[value[0].toString()]=value[1]}};in_.forEach(value=>{if(broke){return}if(if_===undefined){
// always run
add(spread_call(value,for_))}else{if(!spread_call(value,if_)){
// no else clause?
if(else_===undefined){return}add(spread_call(value,else_))}else{add(spread_call(value,for_))}}});return result}_PYTHASCRIPT_MODULES.add("comp.js");function zip(...values){
// minimum length of values
let min_length=Math.min(...comp({type:[],for_:val=>val.length,in_:values}));let zipped=[];for(i of range(min_length)){zipped.push(comp({type:[],for_:l=>l[i],in_:values}))}return zipped}_PYTHASCRIPT_MODULES.add("zip.js")
/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/*jslint bitwise: true */(function(){"use strict";var ERROR="input is invalid type";var WINDOW=typeof window==="object";var root=WINDOW?window:{};if(root.JS_SHA256_NO_WINDOW){WINDOW=false}var WEB_WORKER=!WINDOW&&typeof self==="object";var NODE_JS=!root.JS_SHA256_NO_NODE_JS&&typeof process==="object"&&process.versions&&process.versions.node;if(NODE_JS){root=global}else if(WEB_WORKER){root=self}var COMMON_JS=!root.JS_SHA256_NO_COMMON_JS&&typeof module==="object"&&module.exports;var AMD=typeof define==="function"&&define.amd;var ARRAY_BUFFER=!root.JS_SHA256_NO_ARRAY_BUFFER&&typeof ArrayBuffer!=="undefined";var HEX_CHARS="0123456789abcdef".split("");var EXTRA=[-2147483648,8388608,32768,128];var SHIFT=[24,16,8,0];var K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];var OUTPUT_TYPES=["hex","array","digest","arrayBuffer"];var blocks=[];if(root.JS_SHA256_NO_NODE_JS||!Array.isArray){Array.isArray=function(obj){return Object.prototype.toString.call(obj)==="[object Array]"}}if(ARRAY_BUFFER&&(root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW||!ArrayBuffer.isView)){ArrayBuffer.isView=function(obj){return typeof obj==="object"&&obj.buffer&&obj.buffer.constructor===ArrayBuffer}}var createOutputMethod=function(outputType,is224){return function(message){return new Sha256(is224,true).update(message)[outputType]()}};var createMethod=function(is224){var method=createOutputMethod("hex",is224);if(NODE_JS){method=nodeWrap(method,is224)}method.create=function(){return new Sha256(is224)};method.update=function(message){return method.create().update(message)};for(var i=0;i<OUTPUT_TYPES.length;++i){var type=OUTPUT_TYPES[i];method[type]=createOutputMethod(type,is224)}return method};var nodeWrap=function(method,is224){var crypto=eval("require('crypto')");var Buffer=eval("require('buffer').Buffer");var algorithm=is224?"sha224":"sha256";var nodeMethod=function(message){if(typeof message==="string"){return crypto.createHash(algorithm).update(message,"utf8").digest("hex")}else{if(message===null||message===undefined){throw new Error(ERROR)}else if(message.constructor===ArrayBuffer){message=new Uint8Array(message)}}if(Array.isArray(message)||ArrayBuffer.isView(message)||message.constructor===Buffer){return crypto.createHash(algorithm).update(new Buffer(message)).digest("hex")}else{return method(message)}};return nodeMethod};var createHmacOutputMethod=function(outputType,is224){return function(key,message){return new HmacSha256(key,is224,true).update(message)[outputType]()}};var createHmacMethod=function(is224){var method=createHmacOutputMethod("hex",is224);method.create=function(key){return new HmacSha256(key,is224)};method.update=function(key,message){return method.create(key).update(message)};for(var i=0;i<OUTPUT_TYPES.length;++i){var type=OUTPUT_TYPES[i];method[type]=createHmacOutputMethod(type,is224)}return method};function Sha256(is224,sharedMemory){if(sharedMemory){blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0;this.blocks=blocks}else{this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}if(is224){this.h0=3238371032;this.h1=914150663;this.h2=812702999;this.h3=4144912697;this.h4=4290775857;this.h5=1750603025;this.h6=1694076839;this.h7=3204075428}else{// 256
this.h0=1779033703;this.h1=3144134277;this.h2=1013904242;this.h3=2773480762;this.h4=1359893119;this.h5=2600822924;this.h6=528734635;this.h7=1541459225}this.block=this.start=this.bytes=this.hBytes=0;this.finalized=this.hashed=false;this.first=true;this.is224=is224}Sha256.prototype.update=function(message){if(this.finalized){return}var notString,type=typeof message;if(type!=="string"){if(type==="object"){if(message===null){throw new Error(ERROR)}else if(ARRAY_BUFFER&&message.constructor===ArrayBuffer){message=new Uint8Array(message)}else if(!Array.isArray(message)){if(!ARRAY_BUFFER||!ArrayBuffer.isView(message)){throw new Error(ERROR)}}}else{throw new Error(ERROR)}notString=true}var code,index=0,i,length=message.length,blocks=this.blocks;while(index<length){if(this.hashed){this.hashed=false;blocks[0]=this.block;blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0}if(notString){for(i=this.start;index<length&&i<64;++index){blocks[i>>2]|=message[index]<<SHIFT[i++&3]}}else{for(i=this.start;index<length&&i<64;++index){code=message.charCodeAt(index);if(code<128){blocks[i>>2]|=code<<SHIFT[i++&3]}else if(code<2048){blocks[i>>2]|=(192|code>>6)<<SHIFT[i++&3];blocks[i>>2]|=(128|code&63)<<SHIFT[i++&3]}else if(code<55296||code>=57344){blocks[i>>2]|=(224|code>>12)<<SHIFT[i++&3];blocks[i>>2]|=(128|code>>6&63)<<SHIFT[i++&3];blocks[i>>2]|=(128|code&63)<<SHIFT[i++&3]}else{code=65536+((code&1023)<<10|message.charCodeAt(++index)&1023);blocks[i>>2]|=(240|code>>18)<<SHIFT[i++&3];blocks[i>>2]|=(128|code>>12&63)<<SHIFT[i++&3];blocks[i>>2]|=(128|code>>6&63)<<SHIFT[i++&3];blocks[i>>2]|=(128|code&63)<<SHIFT[i++&3]}}}this.lastByteIndex=i;this.bytes+=i-this.start;if(i>=64){this.block=blocks[16];this.start=i-64;this.hash();this.hashed=true}else{this.start=i}}if(this.bytes>4294967295){this.hBytes+=this.bytes/4294967296<<0;this.bytes=this.bytes%4294967296}return this};Sha256.prototype.finalize=function(){if(this.finalized){return}this.finalized=true;var blocks=this.blocks,i=this.lastByteIndex;blocks[16]=this.block;blocks[i>>2]|=EXTRA[i&3];this.block=blocks[16];if(i>=56){if(!this.hashed){this.hash()}blocks[0]=this.block;blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0}blocks[14]=this.hBytes<<3|this.bytes>>>29;blocks[15]=this.bytes<<3;this.hash()};Sha256.prototype.hash=function(){var a=this.h0,b=this.h1,c=this.h2,d=this.h3,e=this.h4,f=this.h5,g=this.h6,h=this.h7,blocks=this.blocks,j,s0,s1,maj,t1,t2,ch,ab,da,cd,bc;for(j=16;j<64;++j){
// rightrotate
t1=blocks[j-15];s0=(t1>>>7|t1<<25)^(t1>>>18|t1<<14)^t1>>>3;t1=blocks[j-2];s1=(t1>>>17|t1<<15)^(t1>>>19|t1<<13)^t1>>>10;blocks[j]=blocks[j-16]+s0+blocks[j-7]+s1<<0}bc=b&c;for(j=0;j<64;j+=4){if(this.first){if(this.is224){ab=300032;t1=blocks[0]-1413257819;h=t1-150054599<<0;d=t1+24177077<<0}else{ab=704751109;t1=blocks[0]-210244248;h=t1-1521486534<<0;d=t1+143694565<<0}this.first=false}else{s0=(a>>>2|a<<30)^(a>>>13|a<<19)^(a>>>22|a<<10);s1=(e>>>6|e<<26)^(e>>>11|e<<21)^(e>>>25|e<<7);ab=a&b;maj=ab^a&c^bc;ch=e&f^~e&g;t1=h+s1+ch+K[j]+blocks[j];t2=s0+maj;h=d+t1<<0;d=t1+t2<<0}s0=(d>>>2|d<<30)^(d>>>13|d<<19)^(d>>>22|d<<10);s1=(h>>>6|h<<26)^(h>>>11|h<<21)^(h>>>25|h<<7);da=d&a;maj=da^d&b^ab;ch=h&e^~h&f;t1=g+s1+ch+K[j+1]+blocks[j+1];t2=s0+maj;g=c+t1<<0;c=t1+t2<<0;s0=(c>>>2|c<<30)^(c>>>13|c<<19)^(c>>>22|c<<10);s1=(g>>>6|g<<26)^(g>>>11|g<<21)^(g>>>25|g<<7);cd=c&d;maj=cd^c&a^da;ch=g&h^~g&e;t1=f+s1+ch+K[j+2]+blocks[j+2];t2=s0+maj;f=b+t1<<0;b=t1+t2<<0;s0=(b>>>2|b<<30)^(b>>>13|b<<19)^(b>>>22|b<<10);s1=(f>>>6|f<<26)^(f>>>11|f<<21)^(f>>>25|f<<7);bc=b&c;maj=bc^b&d^cd;ch=f&g^~f&h;t1=e+s1+ch+K[j+3]+blocks[j+3];t2=s0+maj;e=a+t1<<0;a=t1+t2<<0}this.h0=this.h0+a<<0;this.h1=this.h1+b<<0;this.h2=this.h2+c<<0;this.h3=this.h3+d<<0;this.h4=this.h4+e<<0;this.h5=this.h5+f<<0;this.h6=this.h6+g<<0;this.h7=this.h7+h<<0};Sha256.prototype.hex=function(){this.finalize();var h0=this.h0,h1=this.h1,h2=this.h2,h3=this.h3,h4=this.h4,h5=this.h5,h6=this.h6,h7=this.h7;var hex=HEX_CHARS[h0>>28&15]+HEX_CHARS[h0>>24&15]+HEX_CHARS[h0>>20&15]+HEX_CHARS[h0>>16&15]+HEX_CHARS[h0>>12&15]+HEX_CHARS[h0>>8&15]+HEX_CHARS[h0>>4&15]+HEX_CHARS[h0&15]+HEX_CHARS[h1>>28&15]+HEX_CHARS[h1>>24&15]+HEX_CHARS[h1>>20&15]+HEX_CHARS[h1>>16&15]+HEX_CHARS[h1>>12&15]+HEX_CHARS[h1>>8&15]+HEX_CHARS[h1>>4&15]+HEX_CHARS[h1&15]+HEX_CHARS[h2>>28&15]+HEX_CHARS[h2>>24&15]+HEX_CHARS[h2>>20&15]+HEX_CHARS[h2>>16&15]+HEX_CHARS[h2>>12&15]+HEX_CHARS[h2>>8&15]+HEX_CHARS[h2>>4&15]+HEX_CHARS[h2&15]+HEX_CHARS[h3>>28&15]+HEX_CHARS[h3>>24&15]+HEX_CHARS[h3>>20&15]+HEX_CHARS[h3>>16&15]+HEX_CHARS[h3>>12&15]+HEX_CHARS[h3>>8&15]+HEX_CHARS[h3>>4&15]+HEX_CHARS[h3&15]+HEX_CHARS[h4>>28&15]+HEX_CHARS[h4>>24&15]+HEX_CHARS[h4>>20&15]+HEX_CHARS[h4>>16&15]+HEX_CHARS[h4>>12&15]+HEX_CHARS[h4>>8&15]+HEX_CHARS[h4>>4&15]+HEX_CHARS[h4&15]+HEX_CHARS[h5>>28&15]+HEX_CHARS[h5>>24&15]+HEX_CHARS[h5>>20&15]+HEX_CHARS[h5>>16&15]+HEX_CHARS[h5>>12&15]+HEX_CHARS[h5>>8&15]+HEX_CHARS[h5>>4&15]+HEX_CHARS[h5&15]+HEX_CHARS[h6>>28&15]+HEX_CHARS[h6>>24&15]+HEX_CHARS[h6>>20&15]+HEX_CHARS[h6>>16&15]+HEX_CHARS[h6>>12&15]+HEX_CHARS[h6>>8&15]+HEX_CHARS[h6>>4&15]+HEX_CHARS[h6&15];if(!this.is224){hex+=HEX_CHARS[h7>>28&15]+HEX_CHARS[h7>>24&15]+HEX_CHARS[h7>>20&15]+HEX_CHARS[h7>>16&15]+HEX_CHARS[h7>>12&15]+HEX_CHARS[h7>>8&15]+HEX_CHARS[h7>>4&15]+HEX_CHARS[h7&15]}return hex};Sha256.prototype.toString=Sha256.prototype.hex;Sha256.prototype.digest=function(){this.finalize();var h0=this.h0,h1=this.h1,h2=this.h2,h3=this.h3,h4=this.h4,h5=this.h5,h6=this.h6,h7=this.h7;var arr=[h0>>24&255,h0>>16&255,h0>>8&255,h0&255,h1>>24&255,h1>>16&255,h1>>8&255,h1&255,h2>>24&255,h2>>16&255,h2>>8&255,h2&255,h3>>24&255,h3>>16&255,h3>>8&255,h3&255,h4>>24&255,h4>>16&255,h4>>8&255,h4&255,h5>>24&255,h5>>16&255,h5>>8&255,h5&255,h6>>24&255,h6>>16&255,h6>>8&255,h6&255];if(!this.is224){arr.push(h7>>24&255,h7>>16&255,h7>>8&255,h7&255)}return arr};Sha256.prototype.array=Sha256.prototype.digest;Sha256.prototype.arrayBuffer=function(){this.finalize();var buffer=new ArrayBuffer(this.is224?28:32);var dataView=new DataView(buffer);dataView.setUint32(0,this.h0);dataView.setUint32(4,this.h1);dataView.setUint32(8,this.h2);dataView.setUint32(12,this.h3);dataView.setUint32(16,this.h4);dataView.setUint32(20,this.h5);dataView.setUint32(24,this.h6);if(!this.is224){dataView.setUint32(28,this.h7)}return buffer};function HmacSha256(key,is224,sharedMemory){var i,type=typeof key;if(type==="string"){var bytes=[],length=key.length,index=0,code;for(i=0;i<length;++i){code=key.charCodeAt(i);if(code<128){bytes[index++]=code}else if(code<2048){bytes[index++]=192|code>>6;bytes[index++]=128|code&63}else if(code<55296||code>=57344){bytes[index++]=224|code>>12;bytes[index++]=128|code>>6&63;bytes[index++]=128|code&63}else{code=65536+((code&1023)<<10|key.charCodeAt(++i)&1023);bytes[index++]=240|code>>18;bytes[index++]=128|code>>12&63;bytes[index++]=128|code>>6&63;bytes[index++]=128|code&63}}key=bytes}else{if(type==="object"){if(key===null){throw new Error(ERROR)}else if(ARRAY_BUFFER&&key.constructor===ArrayBuffer){key=new Uint8Array(key)}else if(!Array.isArray(key)){if(!ARRAY_BUFFER||!ArrayBuffer.isView(key)){throw new Error(ERROR)}}}else{throw new Error(ERROR)}}if(key.length>64){key=new Sha256(is224,true).update(key).array()}var oKeyPad=[],iKeyPad=[];for(i=0;i<64;++i){var b=key[i]||0;oKeyPad[i]=92^b;iKeyPad[i]=54^b}Sha256.call(this,is224,sharedMemory);this.update(iKeyPad);this.oKeyPad=oKeyPad;this.inner=true;this.sharedMemory=sharedMemory}HmacSha256.prototype=new Sha256;HmacSha256.prototype.finalize=function(){Sha256.prototype.finalize.call(this);if(this.inner){this.inner=false;var innerHash=this.array();Sha256.call(this,this.is224,this.sharedMemory);this.update(this.oKeyPad);this.update(innerHash);Sha256.prototype.finalize.call(this)}};var exports=createMethod();exports.sha256=exports;exports.sha224=createMethod(true);exports.sha256.hmac=createHmacMethod();exports.sha224.hmac=createHmacMethod(true);if(COMMON_JS){module.exports=exports}else{root.sha256=exports.sha256;root.sha224=exports.sha224;if(AMD){define(function(){return exports})}}})();
/*end sha256.js*/_PYTHASCRIPT_MODULES.add("sha256.js")
/**
 * Generates randomised numbers.
 */;class Random{constructor(seed){this.max=1n<<256n;if(seed===undefined){this._seed=Random.hash(Math.random()+(new Date).getUTCMilliseconds())}else{this._seed=seed}}
/**
     * Tries to create a unique String based on a given object.
     * @param {*} value value to convert
     * @returns {String} string of value
     */static convert_object_to_string(value){return value.toString()+Object.values(value)+Object.keys(value)+typeof value}
/**
     * Hashes any value.
     * @param {*} value value to hash
     * @returns {BigInt} hash
     */static hash(value){let hash=sha256.create();hash.update(Random.convert_object_to_string(value));let arr=hash.array();let bint=0n;for(const i of range(32)){bint<<=8n;bint|=BigInt(arr[i])}return bint}
/**
     * Seed this generator with any value.
     * @param {*} seed value to seed with.
     */seed(seed){this._seed=Random.hash(seed)}
/**
     * Gets the state of this generator.
     * @returns {BigInt} state of this generator
     */getstate(){return this._seed}
/**
     * Sets the state of this generator.
     * @param {BigInt} state state to set
     */setstate(state){this._seed=state}
/**
     * Generates an Array of `n` random bytes.
     * @param {Number} n bytes to generate
     * @returns {Array} bytes
     */randbytes(n){let bytes=[];for(let i of range(n)){bytes.push(Number(this._random()&255))}return bytes}
/**
     * Picks a random integer from the range [0, stop).
     * @param {Number} stop end of range
     * @returns {Number} integer chosen
     */randrange(stop){return Math.floor(this._random()*stop)}
/**
     * Picks a random integer from the range [a, b].
     * @param {Number} a start of range
     * @param {Number} b end of range
     * @returns {Number} integer chosen
     */randint(a,b){return Math.floor(this._random()*(b-a+1)+a)}
/**
     * Creates a random BigInt of the specified length.
     * @param {Number} k number of bits
     * @returns {BigInt} bits chosen
     */getrandbits(k){let n=math.ceil(k/256);let num=0n;for(let i of range(n)){num<<=256n;num|=this._random()}return num%(1n<<BigInt(k))}
/**
     * Chooses a single item from an Array.
     * @param {Array} population items to choose from
     * @returns {*} choice made
     */choice(population){return population[this.randrange(population.length)]}
/**
     * Makes choices from an Array with replacement.
     * @param {Array} population items to choose from
     * @param {Number} k number of picks
     * @param {Array} weights weights of items
     * @returns {Array} choices made
     */choices(population,k,weights){return this._choices(population,k,true,weights)}
/**
     * Samples an Array, without replacement.
     * @param {Array} population items to sample from
     * @param {Number} k amount to sample
     * @param {Array} weights weights of values
     * @returns {Array} samples made
     */sample(population,k,weights){return this._choices(population,k,false,weights)}
/**
     * Picks items from an Array, with or without replacement.
     * @param {Array} population population to pick from
     * @param {Number} picked amount to pick
     * @param {Boolean} replacement whether to replace or not
     * @param {Array} weights weights of values (not needed)
     * @returns {Array} picked values
     */_choices(population,picked,replacement=true,weights){population=[...population];// shallow copy and coerce to array
let values=[];for(let i=0;i<picked;i++){let point=this.random();if(weights!==undefined){let weight_total=sum(weights);point*=weight_total;j=0;while(point>0){point-=weights[j];j++}values.push(population[j]);if(!replacement){population.splice(j,1)}}else{point*=population.length;values.push(population[Math.floor(point)]);if(!replacement){population.splice(Math.floor(point),1)}}}return values}
/**
     * Shuffles an array out-of-place.
     * @param {Array} arr array to be shuffled
     * @returns {Array} shuffled array
     */shuffle(arr){return this.sample(arr,arr.length)}
/**
     * Generates a number between 0 and 1 (not including 1).
     * @returns {Number} value
     */random(){return Number(this._random())/Number(this.max+1n)}
/**
     * Generate a random real number between `a` and `b`.
     * @param {Number} a endpoint 1
     * @param {Number} b endpoint 2
     * @returns {Number} value
     */uniform(a,b){return a+this.random()*(b-a)}
/**
     * Generate a random bigint with 256bits.
     * @returns {BigInt} random 256bit bigint
     */_random(){return this._seed=Random.hash(this._seed)}}const random=new Random(Random.hash(Math.random()+(new Date).getUTCMilliseconds()));_PYTHASCRIPT_MODULES.add("random.js");const print=console.log;const math=Math;const min=math.min;const max=math.max;const round=math.round;const floor=math.floor;const ceil=math.ceil;function sum(iter){let total=0;for(let v of iter){total+=v}return total}function product(iter){let total=1;for(let v of iter){total*=v}return total}function len(value){return value.length}function enumerate(value){return zip(range(len(value)),value)}function floordiv(a,b){return math.floor(a/b)}function divmod(a,b){return[floordiv(a,b),a%b]}function all(values){for(let i=0;i<values.length;i++){if(!values[i]){return false}}return true}function any(values){for(let i=0;i<values.length;i++){if(values[i]){return true}}return false}function bin(num){return num.toString(2)}function oct(num){return num.toString(8)}function hex(num){return num.toString(16)}function chr(code){return String.fromCharCode(code)}function ord(char){return char.codePointAt()}function gcd(a,b){while(b!=0){let c=b;b=a%b;a=c}return a}function lcm(a,b){return a*b/gcd(a,b)}function modpow(x,e,m){let res=1n;x=x%m;while(e>0n){if(e&1n){res=res*x%m}e>>=1n;x=x*x%m}return res}function miller_rabin(n,k=64){if((n&1n)==0n){return false;// even
}if(n==1n){return false;// not prime
}
// narrow down even more
[3n,5n,7n,9n,11n,13n,17n,19n,23n].forEach(prime=>{if(n%prime==0n){return false}});let d=n-1n;let r=0n;while((d&1n)==0n){d>>=1n;r++}for(let i=0;i<k;i++){const a=2n+random._random()%(n-4n);if(a<n-2n){let x=modpow(a,d,n);if(x==1n||x==n-1n){continue}let composite=true;for(let j=0;j<r-1n;j++){x=x*x%n;if(x==n-1n){composite=false;break}else if(x==1n){return false}}if(composite){return false}}}return true}function pow(x,e){return x**e}function type(value){return typeof value}_PYTHASCRIPT_MODULES.add("simples.js")
/**
 * Decorate a function with the given decorators / decorator
 * @param {Array|Function} decorators array of decorators in order, or a single decorator
 * @param {Fucntion} f function to decorate
 * @returns {Function} the decorated function
 */;function dec(decorators,f){if(decorators instanceof Function){return decorators(f)}else{for(let d of decorators){f=d(f)}return f}}_PYTHASCRIPT_MODULES.add("decor.js");
