(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"wrong hit_atlas_1", frames: [[1524,996,301,188],[1687,0,350,388],[1061,1023,301,188],[1687,390,350,388],[0,968,294,243],[762,591,355,314],[0,583,408,383],[566,1179,301,188],[410,591,350,388],[1119,591,403,214],[1524,780,403,214],[621,0,531,589],[762,907,297,270],[296,981,268,258],[0,0,619,581],[1119,807,403,214],[1154,0,531,589]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_36 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["wrong hit_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.yellowhead = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AgZCHQAghXCPApQALAEANADAgZCHQABAGgFAjQAOghgKgIQgCh3izAFQC9gYhNisQBZCtDUhtQi+CWCFAy");
	this.shape.setTransform(20.675,17.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AjOApQC9gZhNirQBZCsDUhrQi+CWCFAxQiPgpggBYQgCh4izAFg");
	this.shape_1.setTransform(20.675,15.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(0.1,1,1).p("ADOCCQAPAFATAGAgjDFQAAg/gignQg6hFidAFQEEgkhqj6QB7D8EkieQjRCuBLBSQATAUAkAPAgjDFQABAIgGAzQAUgwgPgLQAsiADFA9");
	this.shape_2.setTransform(20.7,17.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF00").s().p("AhFB8Qg5hEidAEQEDgkhpj6QB5D7EkidQjQCvBLBRQASAVAlAOQjFg8grCAQgBhAgigng");
	this.shape_3.setTransform(20.7,14.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.7,-9,58.900000000000006,53.3);


(lib.window_girl2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("AtiRMIAAwNIAAhBIAAhCIAAtYIa8AAIAQNrIAAABIACB1IATQHIC1AAIC2AAIhLB9IhLB9MghxAAAIhqh9Ihrh9IDIAAIDIAAIbhAAARHQBIgTBLAwqRMMgDIgmRMAnlAAAMgC/AmRAyHTJMAkmAAA");
	this.shape.setTransform(126.675,134.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,1,1).p("AHEq+IAChUIFxAAIACBXIACBLIl5gEIAChKIF1ADAHBpJIABgrAHBpJQATAYAZAVQAIAJARAJIAeATAG9mKQAKAHANAHIA9AnAG9mKIAEi/AG0AIIAAA5IGqAHIAWg6AG4i3QAGADAGAEQAuAnBjAkIBkAuIkEAAIADiAIAFjTAG0AIIHAAFAK5g3ICOAAIgMo5AkYpTQglBThCBLIgCjIIAAhHIgBhOIK/AAIgBBTAEBp2IkkgDIAcAKQBrDCDRCdIgDDHIqvAAIAAiVIgCjXAEBp2QAVA4AjAwIAChngAE7p1IABhKAmBrEIK9AFAgjp5IlegEAnto4IAAhGIAAhHIAAhNIksAAIAABLIAABGAnto4QgcAZgmASQgKAGgSAFIggALAntlPQgJAHgKAHQgXAXg0AaIhYAyAntlPIAAjpAntp+IksgDAsZrHIEsACAntg9IkrgKIgBo6An2gBIAJg8IAAhXIiDBMAtYA8IFYAAIAKg9IBfABIgBA1ILuALIADg4IBbAAAtYgFIFiAEAmXAAILwAIAntiUIAAi7Agjp5QhjDkj3C3AE1kQIAEj+AwgSLMgBhgkVMAkDAAAMgBEAkVAtYB+IbOAG");
	this.shape_1.setTransform(125.675,128.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AutAdIhkhYQQRgtQSAtIh0BuQl7AfmTAAQoKAAozg1g");
	this.shape_2.setTransform(131.075,27.9037);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FDF2CF").s().p("AtwOCIAAwMIbOAGIATQGgAGcjGIAAg5IHAAFIAAAAIgWA6gAmwjTIABg1ILwAIIgDA4gAtwjMIAAhBIFhAEIgJA9gAGdk/IACiBIANAIQAuAmBjAlIBkAugAmVlSIAAiUQD2i4BkjjIAcAJQBqDCDSCeIgEDGg");
	this.shape_3.setTransform(128.1,155.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#384055").s().p("AwnUIIhqh9MAkmAAAIhLB9gAN2QOIgTwHIgCh1IAAgBIgRtrI67AAIAANYIAABCIAABBIAAQNIjIAAMgBhgkVMAkCAAAMgBDAkVgAvvynIBkBZQPlBeNnhIIB0hvQoJgXoJAAQoIAAoKAXgAGvrxIAChJIF0ACIACBMgADtryIkjgDIlegFIgBhHIK9AGIgBBJgAstr+IAAhFIEsABIAABHg");
	this.shape_4.setTransform(127.625,141.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FDF2A7").s().p("AKjFuIhkguQhjglgugmIgNgIIAGjSIAEi+QATAXAZAVQAIAJARAKIAdASIgdgSQgRgKgIgJQgZgVgTgXIABgrIF4AEIAMI4gAG+ApIA9AnIg9gnIgXgOIAXAOgAsvFeIAAo6IErADIAABGQgbAZgmASQgKAHgSAFIghALIAhgLQASgFAKgHQAmgSAbgZIAADoIgSAOQgXAYg0AZIhYAzIBYgzQA0gZAXgYIASgOIAAC7IiCBMICChMIAABYgAmVgQIgCjHIFeAEQhkDij2C4gAmVgQQBChKAlhTQglBThCBKgAgdjKIgcgJIEkADQAVA3AjAxQgjgxgVg3IA5AAIgBBoIgED9QjSidhqjCgAoEBVgAGukYIAChVIFxAAIACBYgAmYkeIgBhPILAAAIgCBUgAsvkhIAAhMIErAAIAABOg");
	this.shape_5.setTransform(127.9,86.525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#67646C").s().p("AyHUHIhrh9IDIAAIDIAAIbhAAIC1AAIC2AAIhLB9gAQ0SKMABEgkVMgkDAAAMABhAkVMgDIgmQMAnlAAAMgC/AmQgAtiB9IAAhCIFYAAIAKg8IBfABIgBA0ILuALIADg4IrwgHIhfgBIAJg8IAAhYIAAi7IAAjpIAAhGIAAhGIAAhOIksAAIAABMIAABFIABI7IErAKIgJA8IligEIAAtYIa8AAIAQNqInAgFIhbgBIBbABIAAA5IGqAGIAWg6IACB2gAG6q+IgCBKIgBArIgEC/IgFDSIgDCBIEEAAICOAAIgMo5IgChLIgChYIlxAAgAmLrEIAABHIACDHIACDYIAACUIKvAAIADjGIAEj+IAChoIABhJIABhUIq/AAgAn3g9g");
	this.shape_6.setTransform(126.675,128.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,257.4,274);


(lib.window_girl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("AwqRMMgDIgmRMAnlAAAMgC/AmRIC2AAIhLB9IhLB9MghxAAAIhqh9Ihrh9IDIAAIDIAAIAAwNIAAhBIAAhCIAAtYIa8AAIAQNrIAAABIACB1IATQHIC1AAARHQBIgTBLAyHTJMAkmAAAAtiRMIbhAA");
	this.shape.setTransform(131.225,121.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,1,1).p("AwgSLMgBhgkVMAkDAAAMgBEAkVAHEq+IAChUIFxAAIACBYIACBLIACBeIABAAIAABIAHAoJIAAgIIAAAAIAChjIAChKIF1AEAHAnFIAAhEAM/m4IgBgRIAAAEAM7pvIl5gFAG0AJIAAA5IGqAGIAWg6AFZAIIBbABIHAAFAmXAAIgBA1ILuALIADg4AM/myIAIF8ImSAAIALnTAmBrEIgBhOIK/AAIgBBTAl+lIIgBgjIAAg+IAAgjIgBAAIAAhFIgBhrIAAhIIK9AFAl+k6IAAgOIAAAOIAAA+AE4oRIAAAoIAAAdIAAAAIgBApQAAAHAAAHIAAAqIgBBYQgBAMAAALAE3mpQAAADAAADAE4npIADiMIABhKAE1kiQAAgGAAgGQAAgDAAgDIABg3AE7p1Iq8gHAsZrGIEsACIAAhOIksAAIAABMIAABFAntg8IAAjPIAAg+IAAgiIAAg+IAAgrIAAg9IAAhtIksgDAntg8IkrgKIgBklIAAg+IAAgrIAAAAIAAg9IAAAAIAAhwAntp+IAAhGAtYgEIFiAEIAJg8AtYA8IFYAAIAKg8IBfAAILwAIAl+j8IABCzIKvAAIADizAtYB+IbOAG");
	this.shape_1.setTransform(130.225,115.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AutAdIhkhYQQRgtQSAtIh0BuQl7AfmTAAQoKAAozg1g");
	this.shape_2.setTransform(133.725,11.7512);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCCCC").s().p("AtwPPIAAwMIbOAGIATQGgAGch5IAAg6IHAAGIAAAAIgXA5gAmxiHIACg1ILwAIIgDA5gAtwh/IAAhBIFiADIgKA+gAGcjzIALnTIAABFIF/AAIAAgEIABARIAAAEIl/AAIAABKIF/AAIAAhIIAIF7gAGqm5IF+AAIAAhMIl+AAgAswkCIgBklIEsAAIAAAiIkgAAIAAA+IEgAAIAADPgAmVkFIgBi0IAAAAIKyAAIgCC0gAEdn2Iq0AAIAAgOIAAgjIK1AAIgBA3gAEfplIq3AAIAAgkIK4AAIgBAqIAAgGgAsxplIAAgrIEsAAIAAArgAEgrNIq4AAIgBhrIK8AHIgDCMgAGorNIAChiIF5ADIACBfgAsxrNIgBhwIEtADIAABtgAGst6IAChUIFwAAIACBYgAmZt/IgBhPIK/AAIgBBTgAsyuDIAAhLIEtAAIAABOg");
	this.shape_3.setTransform(132.65,134.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#990066").s().p("AGvCKIAAhMIF+AAIAABMgAEhCKIqyAAIgBg9IK0AAIAAAGIAAAGIAAAMIAAAQIAAAVgAsgB8IAAg+IEgAAIAAA+gAGtAdIAAhJIF/AAIAAACIAABHgAEjAcIq1AAIgBg9IK3AAIAAAGIAAAOIgBApgAssAcIAAg9IEsAAIAAA9gAGsg9IAAhFIAAgHIABAAIF9AAIABAAIAABIIAAAEgAElhFIq4AAIAAAAIAAhEIK4AAIAAAoIAAAcgAsshMIgBAAIAAg9IABAAIEsAAIAAA9g");
	this.shape_4.setTransform(132.15,76.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF9933").s().p("AAAAVIAAgpIAAApg");
	this.shape_5.setTransform(161.3125,77.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF66").s().p("AAAAHIAAgNIAAANg");
	this.shape_6.setTransform(91.8875,83.4625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#384055").s().p("AwnUIIhqh9MAkmAAAIhLB9gAN2QOIgTwHIgCh1IAAgBIgRtqI67AAIAANYIAABBIAABBIAAQNIjIAAMgBhgkVMAkCAAAMgBDAkVgAwCzHIBkBZQPlBeNnhIIB0hvQoJgWoKAAQoIAAoJAWgAGvrwIAChLIF0AEIACBKgAmUr5IgBhHIK9AEIgBBKgAstr+IAAhGIEsADIAABGg");
	this.shape_7.setTransform(132.175,128.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#67646C").s().p("AyHUHIhrh9IDIAAIDIAAIbhAAIC1AAMABEgkVMgkDAAAMABhAkVMgDIgmQMAnlAAAMgC/AmQIC2AAIhLB9gAtiB9IAAhCIFYAAIAKg8IAJg8IAAjPIAAg+IAAgiIAAg9IAAgsIAAg9IAAhtIAAhGIAAhOIksAAIAABMIAABFIAABwIAAAAIAAA9IAAAAIAAAsIAAA9IABElIErAKIgJA8IligEIAAtYIa8AAIAQNqInAgFIhbgBIBbABIAAA5IGqAGIAWg6IACB2gAmhAAIgBA0ILuALIADg4IrwgHIhfgBgAG2oKIgLHTIGSAAIgIl8IAAgCIAAgEIgBgRIAAhIIgBAAIgCheIgChLIgChYIlxAAIgCBVIgCBKIgCBiIAAAAgAmHhKIKvAAIADizIAAAAIAAgWIABhZIABAAIAAgqIAAgOIABgpIAAAAIAAgdIADiMIABhJIABhUIq/AAIABBPIAABHIABBrIAABFIAAAAIABAkIAAA9IAAAjIAAAOIABAAIAAA+IAAAAgAErkjIAAgMIAAgGIABg3IAAAAIgBBZg");
	this.shape_8.setTransform(131.225,115.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.6,-15,257.29999999999995,274);


(lib.window_boy1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("AtiRMIAAwNIAAhBIAAhCIAAtYIa8AAIAQNrIAAABIACB1IATQHIC1AAIC2AAIhLB9IhLB9MghxAAAIhqh9Ihrh9IDIAAIDIAAIbhAAARHQBIgTBLAyHTJMAkmAAAAwqRMMgDIgmRMAnlAAAMgC/AmR");
	this.shape.setTransform(126.675,134.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,1,1).p("AHEq+IAChUIFxAAIACBXIACBLIl5gEIAChKIF1ADAHBpJIABgrAHBpJQATAYAZAVQAIAJARAJIAeATAG9mKQAKAHANAHIA9AnAG9mKIAEi/AG0AIIAAA5IGqAHIAWg6AK5g3IkEAAIADiAQAGADAGAEQAuAnBjAkIBkAuICOAAIgMo5AG0AIIHAAFAG4i3IAFjTAmBp9IAAhHIgBhOIK/AAIgBBTAl/m1IgCjIAkYpTQglBThCBLAgjp5IAcAKQBrDCDRCdIgDDHIqvAAIAAiVIgCjXAE5oOIAChnIABhKAE7p1Ig6gBQAVA4AjAwAEBp2IkkgDIlegEAmBrEIK9AFAnto4IAAhGIAAhHIAAhNIksAAIAABLIAABGAntlPQgJAHgKAHQgXAXg0AaIhYAyAnto4QgcAZgmASQgKAGgSAFIggALAsZrHIEsACAntp+IksgDAntlPIAAjpAntg9IAAhXIiDBMAtYA8IFYAAIAKg9IAJg8IkrgKIgBo6AtYgFIFiAEIBfABIgBA1ILuALIADg4IBbAAAmXAAILwAIAE1kQIAEj+Agjp5QhjDkj3C3AntiUIAAi7AtYB+IbOAGAwgSLMgBhgkVMAkDAAAMgBEAkV");
	this.shape_1.setTransform(125.675,128.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AutAdIhkhYQQRgtQSAtIh0BuQl7AfmTAAQoKAAozg1g");
	this.shape_2.setTransform(131.075,25.8037);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#33FFCC").s().p("AKjFuIhkguQhjglgugmIgNgIIAGjSIAEi+IABgrIF4AEIAMI4gAG+ApIA9AnIg9gnIgXgOIAXAOgAHXh3QAIAJARAKIAdASIgdgSQgRgKgIgJQgZgVgTgXQATAXAZAVgAsvFeIAAo6IErADIAABGQgbAZgmASQgKAHgSAFIghALIAhgLQASgFAKgHQAmgSAbgZIAADoIgSAOQgXAYg0AZIhYAzIBYgzQA0gZAXgYIASgOIAAC7IiCBMICChMIAABYgAmVgQQBChKAlhTQglBThCBKIgCjHIFeAEIEkADIA5AAIgBBoQgjgxgVg3QAVA3AjAxIgED9QjSidhqjCIgcgJQhkDij2C4gAoEiTgAGukYIAChVIFxAAIACBYgAmYkeIgBhPILAAAIgCBUgAsvkhIAAhMIErAAIAABOg");
	this.shape_3.setTransform(127.9,86.525);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FDF2CF").s().p("AtwOCIAAwMIbOAGIATQGgAGcjGIAAg5IHAAFIAAAAIgWA6gAmwjTIABg1ILwAIIgDA4gAtwjMIAAhBIFhAEIgJA9gAGdk/IACiBIANAIQAuAmBjAlIBkAugAmVlSIAAiUQD2i4BkjjIAcAJQBqDCDSCeIgEDGg");
	this.shape_4.setTransform(128.1,155.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#384055").s().p("AwnUIIhqh9MAkmAAAIhLB9gAN2QOIgTwHIgCh1IAAgBIgRtrI67AAIAANYIAABCIAABBIAAQNIjIAAMgBhgkVMAkCAAAMgBDAkVgAvvy8IBkBZQPlBeNnhJIB0huQoJgXoJAAQoIAAoKAXgAGvrxIAChJIF0ACIACBMgADtryIkjgDIlegFIgBhHIK9AGIgBBJgAstr+IAAhFIEsABIAABHg");
	this.shape_5.setTransform(127.625,141.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#67646C").s().p("AyHUHIhrh9IDIAAIDIAAIbhAAIC1AAIC2AAIhLB9gAQ0SKgAR4yLMgkDAAAMABhAkVMgDIgmQMAnlAAAMgC/AmQgAtiB9IAAhCIFYAAIAKg8IligEIAAtYIa8AAIAQNqInAgFIhbgBIBbABIAAA5IGqAGIAWg6IACB2gAoAgBIBfABIgBA0ILuALIADg4IrwgHIhfgBIAJg8IAAhYIAAi7IAAjpIAAhGIAAhGIAAhOIksAAIAABMIAABFIABI7IErAKIgJA8gAG6q+IgCBKIgBArIgEC/IgFDSIgDCBIEEAAICOAAIgMo5IgChLIgChYIlxAAgAmLrEIAABHIACDHIACDYIAACUIKvAAIADjGIAEj+IAChoIABhJIABhUIq/AAgAGqAIgAn3g9g");
	this.shape_6.setTransform(126.675,128.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,257.4,274);


(lib.window_boy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("AwqRMMgDIgmRMAnlAAAMgC/AmRIC2AAIhLB9IhLB9MghxAAAIhqh9Ihrh9IDIAAIDIAAIAAwNIAAhBIAAhCIAAtYIa8AAIAQNrIAAABIACB1IATQHIC1AAARHQBIgTBLAtiRMIbhAAAyHTJMAkmAAA");
	this.shape.setTransform(131.225,121.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,1,1).p("AwgSLMgBhgkVMAkDAAAMgBEAkVAHEq+IAChUIFxAAIACBYAHAnFIAAhEIAAgIIAAAAIAChjIAChKIF1AEIACBLIACBeIABAAIAABIAM/m4IgBgRIAAAEAM7pvIl5gFAG0AJIAAA5IGqAGIAWg6AmXAAIgBA1ILuALIADg4IBbABIHAAFAM/myIAIF8ImSAAIALnTAmBrEIgBhOIK/AAIgBBTAl+lIIgBgjIAAg+IAAgjIgBAAIAAhFIgBhrIAAhIIK9AFAl+lIIAAAOIAAA+Al+k6IAAgOAE4oRIAAAoIAAAdIAAAAIgBApQAAAHAAAHIAAAqIgBBYQgBAMAAALAE3mpQAAADAAADAE4npIADiMIq8gHAE1kiQAAgGAAgGQAAgDAAgDIABg3AE7p1IABhKAntrEIAAhOIksAAIAABMgAntg8IAAjPIAAg+IAAgiIAAg+IAAgrIAAg9IAAhtIksgDAntg8IkrgKIgBklIAAg+IAAgrIAAAAIAAg9IAAAAIAAhwAntp+IAAhGAsZrGIAABFAtYgEIFiAEIAJg8AtYA8IFYAAIAKg8IBfAAILwAIAl+j8IABCzIKvAAIADizAtYB+IbOAG");
	this.shape_1.setTransform(130.225,115.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AutAdIhkhYQQRgtQSAtIh0BuQl7AfmTAAQoKAAozg1g");
	this.shape_2.setTransform(133.725,11.7512);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF9933").s().p("AGvCKIAAhMIF+AAIAABMgAEhCKIqyAAIgBg9IK0AAIAAAGIAAAGIAAAMIAAAQIAAAVgAsgB8IAAg+IEgAAIAAA+gAGtAdIAAhJIF/AAIAAACIAABHgAEjAcIABgpIAAApgAEjAcIAAAAIq1AAIgBg9IK3AAIAAAGIAAAOIgBApgAssAcIAAg9IEsAAIAAA9gAEkgNgAGsg9IAAhFIAAgHIABAAIF9AAIABAAIAABIIAAAEgAElhFIq4AAIAAAAIAAhEIK4AAIAAAoIAAAcgAsshMIgBAAIAAg9IABAAIEsAAIAAA9g");
	this.shape_3.setTransform(132.15,76.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF66").s().p("AtwPPIAAwMIbOAGIATQGgAGch5IAAg6IHAAGIAAAAIgXA5gAmxiHIACg1ILwAIIgDA5gAtwh/IAAhBIFiADIgKA+gAGcjzIALnTIAABFIF/AAIAAgEIABARIAAAEIl/AAIAABKIF/AAIAAhIIAIF7gAGqm5IF+AAIAAhMIl+AAgAswkCIgBklIEsAAIAAAiIkgAAIAAA+IEgAAIAADPgAmVkFIgBi0IAAAAIKyAAIgCC0gAEdn2Iq0AAIAAgOIAAAOIAAAAIAAgOIAAgjIK1AAIgBA3gAEfplIq3AAIAAgkIK4AAIgBAqIAAgGgAsxplIAAgrIEsAAIAAArgAEgrNIq4AAIgBhrIK8AHIgDCMgAGorNIAChiIF5ADIACBfgAsxrNIgBhwIEtADIAABtgAGst6IAChUIFwAAIACBYgAmZt/IgBhPIK/AAIgBBTgAsyuDIAAhLIEtAAIAABOg");
	this.shape_4.setTransform(132.65,134.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#384055").s().p("AwnUIIhqh9MAkmAAAIhLB9gAN2QOIgTwHIgCh1IAAgBIgRtqI67AAIAANYIAABBIAABBIAAQNIjIAAMgBhgkVMAkCAAAMgBDAkVgAwCzHIBkBZQPlBeNnhIIB0hvQoJgWoKAAQoIAAoJAWgAGvrwIAChLIF0AEIACBKgAmUr5IgBhHIK9AEIgBBKgAstr+IAAhGIEsADIAABGg");
	this.shape_5.setTransform(132.175,128.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#67646C").s().p("AyHUHIhrh9IDIAAIDIAAIbhAAIC1AAMABEgkVMgkDAAAMABhAkVMgDIgmQMAnlAAAMgC/AmQIC2AAIhLB9gAtiB9IAAhCIFYAAIAKg8IligEIAAtYIa8AAIAQNqInAgFIhbgBIrwgHIhfgBIAJg8IAAjPIAAg+IAAgiIAAg9IAAgsIAAg9IAAhtIAAhGIAAhOIksAAIAABMIAABFIAABwIAAAAIAAA9IAAAAIAAAsIAAA9IABElIErAKIgJA8IBfABIgBA0ILuALIADg4IBbABIAAA5IGqAGIAWg6IACB2gAM9g3IgIl8IAAgCIAAgEIgBgRIAAhIIgBAAIgCheIgChLIgChYIlxAAIgCBVIgCBKIgCBiIAAAAIAAAIIgLHTIGSAAgAmHhKIKvAAIADizIAAAAIAAgWIABhZIABAAIAAgqIAAgOIABgpIAAAAIAAgdIADiMIABhJIABhUIq/AAIABBPIAABHIABBrIAABFIAAAAIABAkIAAA9IAAAjIAAAOIABAAIAAA+IAAAAgAErkjIAAgMIAAgGIABg3IAAAAIgBBZgAEslsg");
	this.shape_6.setTransform(131.225,115.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.6,-15,257.29999999999995,274);


(lib.teeth = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ACZhnIAjgdQBnh6CbA8QCPBggyDBQgMAPgGAHQAngvgsA3An/CQQC2CECghvQDdh+BtBqQCxBvCyiDIAAAAIAFgIAFJAnQBmAXBsAhAFJAnIAAhQAAKhBQBHAABIgmQAYgNAZgSACmALIAABCAALgCQBLACBQALQBPAKBUASAALgCIgBg/QhegBhghEQhrh5iiA8QiUBfBCDBQAAACABABIgBgCQAAAAAAgBQgBAAAAAAIABAAQA+gcBCgTQAtgOAvgKQA7gMA9gGIAAhMAhmgCQA4gCA5ACAhmgCIAABFAoSBgQAAABAAAAIAAAAgAoSBhQABABAAABQAHAVAKAXQAAAAABABQgvhAAuA/AoSBhQABABAAABQASAtAAAAAn/CQIAAAAAmSgeIgBBMAk3AWIAABBAi/AEQAsgEAtgC");
	this.shape.setTransform(55.2042,21.606);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("An/CQIgSgtIgBgCIAAgBIgBgDQA+gcBCgTQAtgOAvgKIAABBIAAhBQgvAKgtAOIABhMIgBBMQhCATg+AcQhCjBCUhfQCig8BrB5QBgBEBeABQBHAABIgmIAjgdQBnh6CbA8QCPBggyDBQhsghhmgXIAAhQIAABQQhUgShPgKQhQgLhLgCQBLACBQALIAABCIAAhCQBPAKBUASQBmAXBsAhIgSAWIgFAIIAAAAQiyCDixhvQhthqjdB+QhJAzhOAAQhcAAhjhIgAhmBDIAAhFgAi/AEQg9AGg7AMQA7gMA9gGQAsgEAtgCQgtACgsAEIAAhMIAABMgAALgCIgBg/IABA/Qg5gCg4ACIA4gBIA5ABgACZhnQAYgNAZgSQgZASgYANgAIbBfIAAAAgAmTAugACmALIAAAAgAi/AEg");
	this.shape_1.setTransform(55.2042,21.606);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("AIKhVIACgKIABgCAE8hZQBngUBwgNQgEAQgCAJQAQg3gTBDAE8hZIgghLABiiXIAUgpQAuiYCngHQCpAfAfDGABiiXQARgVAPgbACbgzIAbA8AAIgBIgZg6QBAgdAzg/AhgArIAcBAAhgArQAzgYA1gUQBGgcBNgWQBNgWBUgQAmcFVQDbAwBnilQCYjNCOA2QDPAgBvi+AlgDQQAkgfAngcIAaA8AgRg7QhYAlhzgYQiShFh9B3QhhCSCJCYQAAAAAAAAQACACAAAAQAAABABAAQAAABABABQAPAQASARIABABIABAAAivBVIgfhHAkVCVQAxgiA1geQAngWAogUAl+CIIAeBIAnBEwIgCgBQAAAAAAgBQAAAAgBAAIABAAQAtgyA2gsAm/EzQAiAhABAB");
	this.shape_2.setTransform(55.3503,21.1009);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AmbFVIgjgiIgBgCIgBgBIgCgCIAAAAQAtgyA2gsQAkgfAngcQgnAcgkAfIgehIIAeBIQg2AsgtAyQiJiYBhiSQB9h3CSBFQBzAYBYglQBAgdAzg/QARgVAPgbQgPAbgRAVIAUgpQAuiYCngHQCpAfAfDGQhwANhnAUIgghLIAgBLQhUAQhNAWIAbA8Igbg8QBNgWBUgQQBngUBwgNIgHAZIAAACIgCAKQhvC+jPggQiOg2iYDNQhQCAiVAAQgsAAgxgLgAkUCVIAaA8Igag8QAxgiA1geQg1AegxAiIAAAAgAhDBrIgchAQAzgYA1gUQBGgcBNgWQhNAWhGAcQg1AUgzAYQgoAUgnAWIgfhHIAfBHQAngWAogUgAAJgBIgZg6gAlfDQgAIUh6IAAAAg");
	this.shape_3.setTransform(55.2981,21.1009);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,1,1).p("ACxgwIApgTQCDhaCHBiQBxCAhjCvQgHAGgGAEQAigYgzAlIARgNAoRATQCOCuC3hBQD3hABNCCQCOCaDOhRIAAAAAE2CIQBcAwBgA8AE2CIIAVhPACxgwQAbgGAcgLAhggQQA3ANA2APIAQg8QhbgZhKhbQhIiQisAQQioA1ANDMIAAABQAAAAAAgBIAAAAQBDgKBFgCACgBCIgSBAAhggQIgSBCAANAMQBIAXBLAfQBKAfBMAnAAdgwQBFATBPgTAkvguQA7AEA8AJIAUhKAkvguIgRA+AoXgfQAAABABAAQgBABABABQABAWAEAYQAAAAAAABQgchJAcBIAoXgiQAAACAAABIAAgCQAAgBAAAAgAoRATIAAAAAoWgcQAFAvAAAAAl6h5IgVBKQAvgBAxACAi4ghQAsAHAsAK");
	this.shape_4.setTransform(55.0187,20.377);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AB0DCQhNiCj2BAQi4BBiNiuIgGgvIAAgCIAAgBIAAgDIAAgBQgOjMCog1QCsgQBICQQBLBbBaAZQBFATBQgTQAagGAdgLQgdALgaAGIApgTQCDhaCGBiQBxCAhiCvQhgg8hdgwIAVhPIgVBPQhMgnhKgfQhKgfhIgXQBIAXBKAfIgRBAIARhAQBKAfBMAnQBdAwBgA8IgOAKIgRANIAAAAQhGAchAAAQh4AAhehlgAh1AyIARhCQA4ANA2APIAPg8IgPA8Qg2gPg4gNQgsgKgrgHIAUhKIgUBKQg8gJg8gEIgRA+IARg+QA8AEA8AJQArAHAsAKgAoagjQBCgKBGgCQhGAChCAKgAkzguQgwgCgvABIAVhKIgVBKIAjAAQAeAAAeABgAHvD0IAAAAgAEyCIIAAAAgACcBCIAAAAgAi7ghIAAAAg");
	this.shape_5.setTransform(55.3935,20.377);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},9).to({state:[{t:this.shape_5},{t:this.shape_4}]},9).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-15.1,112.4,72.39999999999999);


(lib.Symbol7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AhJOrIAAgHABKurIAAdJAhJOcIAA9A");
	this.shape.setTransform(29.125,131.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0066").s().p("AhJO9IARgMIgFAGQgGAIgGAFgAAhObQgSgUgNgWIAAgBIAAgIIgBAHIgBgDIABAEQgLAFgSAVQgNAPgIAMIgBACIgXAOIAA9AIAIgCQAXgEAQgTIAHgJQAGgLADgLIAGALIADAEQAQAZAWAIQAQAFAVgEIAAdJQgYgOgRgOg");
	this.shape_1.setTransform(29.125,129.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0033").s().p("AB9U8QgagCgVgWQgSgSgMgdQgSgngEgtQgBgUgKAAQgMgBgDAYQgBAagRAdQgSAggcAUQgfAWghACQgoADgjgZQgjgYgMgnQgGgTgBgZQgBgPACgfQACghAEgVQAFgdANgUQAQgYApgfIBvhTIAAAIIgDACIADgCQANgIAPgUIARgNIACgDIgOAIIALgOIAIgFQABgDADgCQABgBAEAAIACgCIABgCIgRALIADgEQAOgUAKgGIgDAOIgBABIABAAIAAAAIAAABIAAADQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAIACgPIAEAHIAAAAIABABIAAACQAIANALAKQgJgHgHgIQATAcAtAfIAEADQA9AqAOANQAxAsAeBKQAZBAgKAwQgHAmgjAvQgqA7grAAIgEAAgAAKNUIAAgBIgBgBIABACgAhrvXQgUgNgOgZQgQgcADgeQADglApgqQALgMAYgWQAZgWAMgNQAeggArhFIAAAFIACgIIAFgIIABAGIABADQAJBiAxBIIATAbQAMAQAFALQAHARAEAYQAEAagHAPQgIASgiARQgLAGgKADQgPAEgMgCQgTgEgUgUIgHgJIgKgPQAAgLgBgMQABAKgCAJQgLgUgFgXQACAbANAYQgEAMgGAKIgGAIQgPAQgWAEIgIABIgFAAQgUAAgSgMg");
	this.shape_2.setTransform(28.2495,134.6069);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("ABlVHQgZgJgTgTQghghgOg9QgSAvgrAeQgsAfgygBQgjgBgfgSQgfgSgRgdQgOgXgFggQgEgXAAglQAAgqAEgbQAGglARgaQASgdAuggQAhgWA9gkIAggTIAXgNIABgCQAIgMANgQQASgUALgFIgCgFIACAEIABgHIAAAHIAAACQANAVASAVQARANAYAOIARAKQA+AjAWATQA1AtAdBPQAbBHgNA0QgFAYgQAaQgKATgVAaQgSAYgPANQgUASgVAGQgLACgKAAQgPAAgQgFgAAOSDQAKAAABAUQAFAtARAnQAMAdASASQAVAWAaACQAtADAsg+QAjgvAHgmQAKgwgZhAQgehKgxgsQgOgNg9gqIgEgDQgtgfgTgcQAHAIAJAHQgLgKgIgNIAAgCIgBgBIAAAAIgEgHIgCAPQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAIAAgDIAAgBIAAAAIgBAAIABgBIADgOQgKAGgOAUIgDAEIARgLIgBACIgCACQgEAAgBABQgDACgBADIgIAFIgLAOIAOgIIgCADIgRANQgPAUgNAIIgDACIADgCQAGgFAGgIIAFgHIgRAMIhvBTQgpAfgQAYQgNAUgFAdQgEAVgCAhQgCAfABAPQABAZAGATQAMAnAjAYQAjAZAogDQAhgCAfgWQAcgUASggQARgdACgaQACgXALAAIABAAgAAINIIABABIAAABIgBgCgAh1vYQgZgRgOgcQgRgiAGgiQAFghAegiQARgTAigfQAlghAPgQQAOgPAVgcIAcgjIAAgCQABgGACgDQABgEADABQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAIABAGIAAABIAAABIABAGIABABQAIAjAFASQALAkAPAaQAIAOAOAUIAWAhQAbAoAGAfQAIAsgaAeQgOAQgbALQgLAEgKACQgVADgQgFQgWgIgRgYIgDgFIgFgLQgDAMgGAKIgHAKQgQASgXAFIgIABIgIABQgXAAgVgOgAgnzVQgMANgZAWQgYAWgLAMQgpAqgDAlQgCAeAPAcQAOAZAUANQAUANAXgBIAIgBQAWgEAPgQIAGgIQAGgKAEgMQgNgYgCgbQAFAXALAUQACgJgBgKQACAMgBALIAKAPIAHAJQAUAUATAEQAMACAPgEQAKgDALgGQAigRAIgSQAHgPgEgaQgEgYgHgRQgFgLgMgQIgTgbQgxhIgJhiIgBgDIgBgGIAAgDIgBgBQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAABQgCADAAAFIAEgFIgFAIIgCAIIAAgFQgrBFgeAgg");
	this.shape_3.setTransform(28.3363,135.6263);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol7, new cjs.Rectangle(0,0,56.7,271.3), null);


(lib.Symbol6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgYDRQgOgPgggXIgSgNIhwhLQgrgegVgUQgggfgJghQgNguAZhDQAWg9AlgTQAegPAxAIQA9AKAmAeQAWASAMAYQAIAPADAPQgLAVgJAbIAVgrIABARQABgKgBgJIAEgJQAPgeARgUQAsg2A4gHQA6gHA6AtQAmAbARAkQAVAsgOAnQgNAlgyAhQgaARgpAUIhGAhQg2AbgWAcQgbAggEAzIAAAMQgJgPgNgOg");
	this.shape.setTransform(31.7117,24.4714);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D14955").s().p("AgDDQQgIgPgOgOQgTgSgrgdIhwhLQgugfgWgWQgjgggKgnQgKgnAPg2QAWhSA1gYQAigPAzAJQA+AMAjAgQAVASALAZQAGAOACAOQAPgjASgXQArg3A7gIQA8gHA+AuQAnAeARAkQAWArgNAqQgNAqg2AkQgaAQgpAUIhGAhQg0AagWAbQgaAggGAxIgBASQAIARACASQgDgPgHgPQgBAZACAnQgFgqAAgegAjqkDQglATgWA9QgZBDANAuQAJAiAgAfQAVATArAeIBwBLIASANQAgAXAOAPQANAOAJAPIAAgMQAEgzAbggQAWgcA2gbIBGghQApgUAagQQAygiANglQAOgngVgsQgRgkgmgbQg6gtg6AHQg4AHgsA2QgRAUgPAeIgEAJQABAJgBAKIgBgRIgVArQAJgbALgVQgDgPgIgPQgMgYgWgSQgmgeg9gKQgRgDgPAAQgbAAgUAKg");
	this.shape_1.setTransform(31.7067,27.9979);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol6, new cjs.Rectangle(0,0,63.4,56), null);


(lib.Symbol5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A30000").s().p("AARCBQgcgrgXgQIgZgNQgPgIgIgKQgIgKgFgOQgFgOABgPQAAgPAFgOQAEgPAJgJQASgUAYAJQAUAHAPAYIAHASIgBgDQgCgWACgUQADgVAJgSQAJgRANgKQAKgIAKgBQALgCAJAGQASAMAFAgQAHApgVA0QgJAYgdA2QgSAjgKAaIACAEIgCgEIgIATIAGgVg");
	this.shape.setTransform(10.0368,15.06);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(0,0,20.1,30.1), null);


(lib.Symbol4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC0000").s().p("ABDCEQgEgIgIgGIAAACIAAgCIgDgCQgKgIgRgFIgegHIhggRQgUgCgJgDQgQgEgJgHQgPgKgFgTQgEgMABgUQADgaAIgPQAMgWAXgIQAQgGATACQARABASAIQAMAFARALIAMAIIgCgHQgDgVAGgRQAIgUAWgSQAVgQAXgHQAcgIAZAGQAcAHAVAYQAPASAGAUQAFAXgIATQgGAPgPAQIgdAaQgdAagQAUQgRAYgGAWIAJAJQANAQgGAPQAAgKgFgKg");
	this.shape.setTransform(17.8759,15.1793);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(0,0,35.8,30.4), null);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AkBlhIG3AAIj/FzID3AAIBUAMInPFEIDjkAIjDg0g");
	this.shape.setTransform(25.8,35.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CC0033").s().p("AAWBiIjDg0IhUmPIG3AAIj/FzID3AAIBUAMInPFEg");
	this.shape_1.setTransform(25.8,35.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-1,-1,53.6,72.8), null);


(lib.Symbol2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("AAqjQICZAAIAAA3IhoALIAAEFQAKALAAANQAAAcgrATQgrATg9AAQg9AAgsgTQgrgTAAgcQAAgbArgTQAsgUA9AAQA9AAArAUQALAEAIAGQAJAGAFAGAAqjQIAxBCAAqjQIAAEdIAjAe");
	this.shape.setTransform(19.525,20.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AiXC+QgrgUAAgbQAAgbArgUQAsgTA9AAQA9AAArATQALAFAIAGIgjgeIAAkdIAxBCIgxhCICZAAIAAA3IhoALIAAEFQgFgGgJgGQAJAGAFAGQAKALAAANQAAAbgrAUQgrATg9AAQg9AAgsgTg");
	this.shape_1.setTransform(19.525,20.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(-2,-2,43.1,45.8), null);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("AIalmQGFg5hFlrAJqA9QEXiYDJCYAJCiKIIIkEAFmieQgmA5g5gaQg+gchTh7QmrquqLGqQmoHAN0CDQs0BGFoH6QKLGnGrqpQAlhtB6hCQAtgZA4gS");
	this.shape.setTransform(109.8138,77.8905);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D14955").s().p("Ao6JCQlon6M0hFQtziEGnm/QKKmrGtKvQBTB7A9AcQBnCchYCaQh6BDglBsQkJGllcAAQjYAAj6ijgAKcCRQgyBYhtBXQAlhsB6hDgAKcCRIAAAAgAKNilIAAAAgAH9k8QBeBLAyBMQg9gchTh7gAH9k8IAAAAg");
	this.shape_1.setTransform(70.7963,81.7188);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(-2,-2,223.7,159.8), null);


(lib.smoke = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AB0gtQArAQAsAGQABAAACAAQAnAFAmgEAB0gtIBXAWACiBfIACAAQAmAIApAOAh1jVQAQAQAQAQAi6gqIAHACAjxBuIARgIQACgDACgEQAEgFAFgFQBQhMElBWAjfC9QAFgHgBgCQAQgKAkgRIAngWQCIhCCaAeAjVCqIABgrAjlCfIAEgtIABgMAjlCfIANgqAjpDFIAEgmAjzDOIAOgvAjfBpIgCAJAj0DPIgmAHAi4h7QCnBjCFgVAhGinQBdBVBdAlAidgjIFABN");
	this.shape.setTransform(87.675,63.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhjHlQgpgKgcgZQgfgbgJgoQgIgfAJgaIgCgEQgJgTAAgaQgeAGgagBQgjgCgdgPQgggRgRgbQgVghAFgrQAFgpAbggQAYgdAngRQAUgIAWgEQgLgDgKgFQghgOgggmQgjgrgJgsQgLg2AbgoQAPgVAZgNQAYgMAbgDQAZgCAaAHQgEgHgDgJQgIgZACgcQACgbAMgZQAag0BBgdQBCgdA4ARQAiALAaAcQAMAOAJAQQAQAMALATIAJAQIAEgDQAPgPAQgFQALgDAMAEQANgHASACQAWAEARASIAEAGQAUAAAQADQA3AMAXApQANAWgDAYIACABQARAOgCAZQgBARgNAXQgHANgIANIAPALQAnAgALApQAHAbgIAUIgFAJQgRAdguAEQgOACgYgBIgIAAIANAcQAQAhgCAbQgBALgEAKQgIAUgSAOQgRANgWAGQgTAFgeABQAbAXASAaIAHAJIgRAJIgHgKQgSgbgcgdIAEgKIABgCIABABIAGAEIAIgBQAXgEAQgFQAsgRANgiQAFgNgBgRQgBgUgJgaIgJgZIgUAAQAHgCALgCIgCgFIAEgFIABAAIACAEIADAFIAIgBIAigFQArgHANgdIAEgKQAEgWgOgdQgLgXgWgWIgFgGIgGgGQgEgDgDgCQAEgEACgEQACgDgBgEIAPgfQAOgggJgRIgFgGQgGAYgVALQALgKAGgQQACgIABgHIgDgCIgBgHIAEABIgBgIQgGgggigWQgagRgmgHIgDgBIAEAMIgCAAIgIgMIgJgCQAAgFgEgDIgBAAIAFAAIgCgCQgSgPgWgCQgHAAgGABIAJAHIgCAAQgFgEgDAAIgCAAIgCgBQgIACgGAFIgBABIgHADIgDACQADgIAGgGIAEgCIgGgBQgJABgVAMQgJAFgFAFIAFAPIgIgEQgJgHgHgIQAHADAFAFIACgDQgLgWgRgTQAEALACAMQgHgVgQgSIgKgIIAFACIgJgIQgagXgggHQg1gLg8AeQgrAWgaAkQgdAnADArQABAWAMASIANAFQgGgBgCABQgEABgBAFIgBAGQgGgGgEgGQgfgEgaAGQgaAGgVAQQgWARgJAXQgNAkAPArQAJAYARAaQAbApAeAVQATAMATAGIAQgBIgKACQARAEASgCQgZAHgbgFQg6ARgiAoQgXAbgFAjQgGAlAPAdQAOAaAcARQAaAPAhAEQAWADAagCQABgPAEgUIABAjIAHgBQAWgDAngHQgkAPggAHQACARAEAOIADAIIAEgIIgDAKIACAGIAAANIgFgHQgDAVAIAXQALAiAbAWQAuAlBSABQAuAAAfgOQArgTAMgkQACgHABgIIABAAQACgHgCgIIAAgDIAAAAIgBgOQADgBACgDIADALIABAFIAHgCQAAABAAABQAAAAAAABQAAAAAAABQABAAAAABQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAAABIgCABQARAFAVgHQAOgEARgLIANgIQAjgaAFgXQADgUgPgaIARgJIAAAAIABADIgCAJIABgMIgBAMIACgJIAHAMIAEAKQAFARgCAOIgEAMIABgrIgBArIgGALQABABgFAHQgCABgBABQAAABgBAAQAAAAAAAAQAAgBABgBIgHAHIAEgmIANgqIgNAqIAEgtIgEAtIgOAvIgBABIgmAHIAmgHIgPAKQgcAQgWAEQgbAFgSgLIgGACQACAQgCAOQgIApgqAaQgfATgyAFIgUAAQgfAAgcgHgABZloIACACIADAFIgDgJIgCACgAAuFxIAHAAIAAABIgHgBgAB/FmIgBgBIABAAIAAABgADjFZIAAAAgADyEpIgEAmIgKAJgAECE0gAD2D8gAD3DwgAB2B/IgCgCIADACgAETjCIACABIAAABIgCgCgAErkRIAHgBIAAABIgHAAgABqkuIgBgEIABAAIABAEgAA3mPIgDgFIAFAHIgCgCg");
	this.shape_1.setTransform(40.4893,49.2317);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AleGuQgbgWgLgiQgIgXADgVIAFAHIAAgNIgCgGIADgKIgEAIIgDgIQgEgOgCgRQAggHAkgPQgnAHgWADIgHABIgBgjQgEAUgBAPQgaACgWgDQghgEgagPQgcgRgOgaQgPgdAGglQAFgjAXgbQAigoA6gRQAbAFAZgHQgSACgRgEIAKgCIgQABQgTgGgTgMQgegVgbgpQgRgagJgYQgPgrANgkQAJgXAWgRQAVgQAagGQAagGAfAEQAEAGAGAGIABgGQABgFAEgBQACgBAGABIgNgFQgMgSgBgWQgDgrAdgnQAagkArgWQA8geA1ALQAhAHAaAXIAJAIIgFgCIAKAIQAQASAHAVQgCgMgEgLQARATALAWIgCADQgFgFgHgDQAHAIAJAHIAIAEIgFgPQAFgFAJgFQAVgMAJgBIAGABIgEACQgGAGgDAIIADgCIAHgDIABgBQAGgFAIgCIACABIACAAQADAAAFAEIACAAIgJgHQAGgBAHAAQAVACASAPIACACIgFAAIABAAQAEADAAAFIAJACIAIAMIACAAIgEgMIADABQAmAHAaARQAiAWAGAgIABAIIgEgBIABAHIADACQgBAHgCAIQgGAQgLAKQAVgLAGgYIAFAGQAJARgOAgIgPAfQABAEgCADQgCAEgEAEQADACAEADIAGAGIAFAGQAWAWALAXQAOAdgEAWIggggIAgAgIgEAKQgNAdgrAHIgiAFIgIABIgDgFIgCgFIgBABIgEAFIACAFQgLACgHACIAUAAIAJAZQAJAaABAUQABARgFANQgNAigsARQgQAFgXAEIgIABIgFgEIgBgBIgBACIgEAKQAbAdASAbIAHAKQAPAagDAUQgFAXgjAaIgNAIQgQALgOAEQgVAHgRgFIACgBIAAgBQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAgBIgHACIgBgFIgDgLQgCADgDABIABAOIAAAAIAAADQACAIgCAHIgBAAQgBAIgCAHQgMAkgrATQgfAOgvAAQhSgBguglgAiGFzIAAgBIgHAAIAHABgAg9FmIABABIAAAAIAAgBIgBAAgAhFCAIABAAIgDgCIACACgABoBiIgHgCgABZi/IAAgBIgCgBIACACgABvkQIAHAAIAAgBIgHABgAhRktIABAAIgBgEIgBAAIABAEgAiEmOIACACIgFgHIADAFgABGE1IAEgMQACgOgFgRIgEgKIgHgMIADgJIAJgKQAmgkBVgBIAAAAIABAAQBeABCXAsIABAAIAEABQiageiJBCIgnAWQgkASgQAKIAGgLgAHADrIgCgBIgEgBIgBAAQiXgshegBIgBAAIAAAAQhVABgmAkIgJAKIgEAGIgHgJQgSgagbgXQAegBATgFQAWgGARgNQASgOAIgUQAEgKABgLQACgbgQghIgNgcIACABIAAABIAIAEIADACQCCBJBuAAIAAAAIAAAAQAYAAAXgDIABAAQArAQAsAGIADAAQAnAFAmgEQhdA0A1BYQgpgOgmgHgAG/C1IlBhOgAFgBgQhuAAiChJIgDgCIgIgEIAAgBIgCgBIAIAAQAYABAOgCQAugEARgdIAFgJQBeBVBdAkIgBAAQgXADgYAAIAAAAIAAAAgADGgqIAAAAg");
	this.shape_2.setTransform(59.2663,49.1274);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(0.1,1,1).p("AhKjVQATAQASAQACTBfIABAAQAnAIAoAOAC7gXQABAAACAAQAnAFAmgEABkgtQAGACAGABQAlAOAmAFAiEhXQA2AZAzALQAaAGAYACQAoADAlgFIBXAWAgyiIQALAJAMAJQAaATAYAQQAnAXAmAPAjbBPQA4grCIATQAYAEAaAFQAqAIAvANQARAFASAFAi0CXIAkgUQA5gbA8gLQAZgFAZgCQAsgCAtAFQARADASADAiagqIAIACAjbBuIAUgIQACgDADgEAjMCfIAPgqAjMCfIAEgtIABgMAi5CqIABgrAjFC9QAGgHgBgCAjeDPIgsAHAjdDOIARgvAjRDFIAFgmAjFBpIgDAJAh7gXIEOBB");
	this.shape_3.setTransform(89.25,63.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Ah0HlQgdgGgXgLQgPgIgOgKQgkgbgKgoQgJgfAKgaIgDgEQgKgTAAgaQgjAGgegBQgpgCgigPQgmgRgTgbQgYghAFgrQAGgpAfggQAdgdAtgRQAYgIAZgEQgMgDgMgFQgngOglgmQgpgrgLgsQgNg2AggoQASgVAdgNQAbgMAggDQAdgCAfAHQgFgHgDgJQgJgZACgcQACgbAOgZQAfg0BLgdQBNgdBCARQAoALAeAcQAOAOAKAQQATAMANATQAGAIAFAIIAFgDQARgPASgFQANgDAOAEQAPgHAWACQAaAEATASIAFAGQAXAAATADQBAAMAbApQAPAWgEAYIADABQATAOgBAZQgBARgQAXQgIANgKANIASALQAuAgAMApQAIAbgJAUIgFAJQgKAOgQAHQgUAKgcACQgRACgbgBIgKAAIAQAcIAEAIQANAdgCAXIgCAMIgDAJQgJAUgWAOQgUANgZAGQgWAFgkABQAYARARASIANAOIAHAJIgUAJIgHgKIgIgJQgTgWgbgZIAAgCIAEgIIACgCIABABIAGAEIAKgBIAfgGIAOgDQA0gRAPgiIACgFQAEgLgBgOQgBgTgKgZIgBgCIgLgZIgEAAIgTAAQAJgCANgCIgDgFIAFgFIABAAIACAEIADAFIAKgBIAZgDIAPgCQAZgDARgKQAQgJAHgOIAEgKQAGgWgRgdQgNgXgZgWQgBgCgFgEIgIgGQgEgDgEgCQAFgEACgEQADgDgCgEIATgfQAQgggLgRIgFgGQgHAYgaALQAOgKAGgQQADgIABgHIgDgCIgBgHIAEABIgBgIQgHgggogWQgegRgtgHIgDgBQADAGACAGIgCAAIgKgMIgKgCQAAgFgFgDIgCAAIAHAAIgDgCQgVgPgZgCQgJAAgHABQAGADAFAEIgDAAQgGgEgDAAIgCAAIgDgBQgJACgHAFIgBABIgIADIgEACQAEgIAHgGIAEgCIgHgBQgLABgYAMQgKAFgGAFQADAHACAIIgIgEQgLgHgJgIQAJADAFAFIADgDQgNgWgUgTQAFALADAMQgJgVgSgSIgMgIIAFACIgKgIQgegXglgHQg/gLhFAeQgzAWgfAkQghAnADArQACAWAOASIAOAFQgGgBgCABQgFABgBAFIgBAGQgHgGgFgGQgkgEgfAGQgfAGgYAQQgZARgLAXQgPAkASArQAKAYATAaQAgApAjAVQAWAMAXAGIASgBIgMACQAVAEAVgCQgeAHgfgFQhEARgnAoQgbAbgHAjQgHAlASAdQAQAaAiARQAeAPAmAEQAaADAegCQACgPAEgUIABAjIAIgBQAagDAtgHQgpAPgmAHQACARAFAOIAEAIIAFgIIgEAKIADAGIAAANIgGgHQgEAVAJAXQANAiAgAWQA2AlBfABQA2AAAkgOQAygTAOgkQADgHABgIIABAAQACgHgCgIIAAgDIAAAAIgBgOQAEgBACgDIADALIACAFIAHgCQAAABAAABQAAAAABABQAAAAAAABQABAAAAABQABAAAAAAQAAABABAAQAAAAABAAQABAAAAAAIABABIgDABQAUAFAZgHQAQgEAUgLIAPgIQAhgVAKgTIADgJQAEgUgSgaIAUgJIAAAAIACADIAHAMIAGAKQAEANAAALIgBAHIgEAMIABgrIgBArIgHALQABABgHAHQgBABgBABQgBABgBAAQAAAAAAAAQAAgBABgBIgIAHIAEgmIAPgqIgPAqIAFgtIgFAtIgQAvIgBABIgsAHIAsgHIgSAKQggAQgaAEQgfAFgVgLIgHACQACAQgDAOQgIApgwAaIgCAAQgkATg7AFIgXAAQgkAAghgHgAEfD8IADgJgAEfD8IABgMgABoloIACACIAEAFIgEgJIgCACgAA1FxIAJAAIAAABIgJgBgACUFmIgBgBIACAAIAAABgAEJFZIAAAAgAEaEpIgEAmIgMAJgAEuE0gAEaEpgAEgDwgACKB/IgDgCIAEACgAFBjCIADABIAAABIgDgCgAFdkRIAJgBIgBABIgIAAgAB8kuIgBgEIABAAIABAEgABAmPIgEgFIAHAHIgDgCg");
	this.shape_4.setTransform(40.4816,49.2317);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AlZGuQgggWgNgiQgJgXAEgVIAGAHIAAgNIgDgGIAEgKIgFAIIgEgIQgFgOgCgRQAmgHApgPQgtAHgaADIgIABIgBgjQgEAUgCAPQgeACgagDQgmgEgegPQgigRgQgaQgSgdAHglQAHgjAbgbQAngoBEgRQAfAFAegHQgVACgVgEIAMgCIgSABQgXgGgWgMQgjgVgggpQgTgagKgYQgSgrAPgkQALgXAZgRQAYgQAfgGQAfgGAkAEQAFAGAHAGIABgGQABgFAFgBQACgBAGABIgOgFQgOgSgCgWQgDgrAhgnQAfgkAzgWQBFgeA/ALQAmAHAeAXIAKAIIgFgCIAMAIQASASAJAVQgDgMgFgLQAUATANAWIgDADQgFgFgJgDQAJAIALAHIAIAEQgCgIgDgHQAGgFAKgFQAYgMAKgBIAHABIgEACQgHAGgDAIIADgCIAIgDIABgBQAHgFAJgCIADABIACAAQADAAAGAEIADAAQgFgEgGgDQAHgBAJAAQAZACAVAPIADACIgHAAIACAAQAFADAAAFIAKACIAKAMIACAAQgCgGgDgGIADABQAtAHAeARQAoAWAHAgIABAIIgEgBIABAHIADACQgBAHgDAIQgGAQgOAKQAagLAHgYIAFAGQALARgQAgIgTAfQACAEgDADQgCAEgFAEQAEACAEADIAIAGQAFAEABACQAZAWANAXQARAdgGAWIglggIAlAgIgEAKQgHAOgQAJQgRAJgZAEIgPACIgZADIgKABIgDgFIgCgFIgBABIgFAFIADAFQgNACgJACIATAAIAEAAIALAZIABACQAKAZABATQABAOgEALIgCAFQgPAig0ARIgOADIgfAGIgKABIgGgEIgBgBIgCACIgEAIIAAACQAbAZATAWIAIAJIAHAKQASAagEAUIgDAJQgKATghAVIgPAIQgUALgQAEQgZAHgTgFIADgBIgBgBQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQAAgBAAgBIgHACIgCgFIgDgLQgCADgEABIABAOIAAAAIAAADQACAIgCAHIgBAAQgBAIgDAHQgOAkgyATQgkAOg3AAQhfgBg2glgAhdFzIAAgBIgJAAIAJABgAgIFmIABABIABAAIAAgBIgCAAgAgRCAIABAAIgEgCIADACgAC5BiIgIgCgACoi/IAAgBIgDgBIADACgADBkQIAIAAIABgBIgJABgAgfktIABAAIgBgEIgBAAIABAEgAhbmOIADACIgHgHIAEAFgACTEKIgGgKIgHgMIgCgDIAAAAIgHgJIgNgOIACgCIABgBIACgBQAmgaBIAAIAAAAIABAAQAfAAAmAFIAFABIABAAIA0AJQApAIAvANIAjAKIgjgGQgtgFgrACQgaACgaAFQg7ALg5AbIgkAUQAAgLgEgNgACEDxIAFgGIgFAGgAHgDrIgCgBIgjgKQgvgNgpgIIg0gJIgBAAIgFgBQgmgFgfAAIgBAAIAAAAQhIAAgmAaIgCABIgBABIgCACQgRgSgYgRQAkgBAWgFQAZgGAUgNQAWgOAJgUIADgJIACgMQACgXgNgdQA2AZAyALQAbAGAZACIADAAIAaABIAAAAIAAAAQAZAAAXgDIALAEQAmANAmAFIADAAQAnAFAmgEQhdA0A1BYQgpgOgmgHgAHfC1IkPhCgAGABgIgagBIgDAAQgZgCgbgGQgygLg2gZIgEgIIgQgcIAKAAQAbABARgCQAdgCATgKIAWASQAaATAaAQQAnAXAmAPQgXADgZAAIAAAAIAAAAgADHAzIAAAAgAEmgqIAAAAg");
	this.shape_5.setTransform(56.077,49.1274);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(0.1,1,1).p("Agjj6QAVAUAUASACtgwQABABACAAQAnAEAmgDACEBHIACAAQAmAIApAOABWhGQAGADAFABQAmAOAmAEAhghbQAcAKAaAGQAbAGAYACQAoADAlgGIBXAWAgwiTQADACADACQAaAUAZAPQAnAYAmAOAitBzIADgBIAMgHQA5gbA7gMQAagEAZgCQAsgCAsAFQASADARADAiGAZQAogBA0AHQAZAEAaAFQApAIAvANQARAFASAFAhZgjIDeA1Ah+gxIAKACAjpA3QADgDADgCAixB2IAEgDAiuB7IgDAKIABgNAjGCCIAWgLQABgCACgCAi3C5IARgxAi3C5IAGg0AihDHIACgyAjKDyIgyAIAivDdQAIgIgBgCAjJDxIASg4Ai7DnIAEgu");
	this.shape_6.setTransform(90.675,65.45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AlVH3QgkgagPgoQgJgaAEgYIAGAIIAAgQIgDgHIAFgLIgGAJIgEgJQgGgRgCgUQAqgIAvgSQgzAJgdADIgKABIgBgpQgEAYgCASQgiACgegEQgqgEgigSQgmgUgSgeQgUgjAIgqQAHgpAeggQAsgvBOgUQAjAGAhgJQgYADgXgFIAOgCIgVABQgagHgZgOQgngYgkgwQgWgfgLgcQgVgzASgpQAMgcAdgUQAbgTAigHQAjgHAoAFIAOAPIABgIQABgFAGgBQACgCAHABIgQgGQgQgUgBgbQgEgxAlgvQAjgqA5gZQBPgjBGANQArAIAiAaIAMAKIgGgDIANAKQAUAVAKAZQgDgOgFgNQAWAWAOAaIgCAEQgHgGgJgEQAJAJANAIQAFAEADABQgCgJgDgJQAHgGAKgFQAcgOAMgBIAIABIgFACQgIAHgEAJIAEgCIAJgDIACgBQAHgHALgCIADABIACAAQAEABAHAEIADAAIgMgIQAIgBAJAAQAdACAYARIACADIgHAAIACAAQAFADAAAHIAMABIALAPIACAAIgFgOIADABQAzAIAhAUQAuAZAHAmIACAKIgFgBIABAIIAEACQgBAIgDAKQgIASgPAMQAdgNAIgcIAFAHQANAUgSAmQgKASgLARQACAFgDAEIgIAKQAEABAFAEIAJAHIAGAHQAcAaAPAbQATAhgGAbIgqgmIAqAmIgFAMQgIAQgSALQgQAJgXAEIgHACIgCAAIgQACIgdADIgKABIgEgGIgCgFIgCABQgCAEgDACIADAGIgMACIgNADIAWAAIAFAAIAMAdIABACIAFAOQAGAVACARQAAALgCAJIgCAJIgCAFQgRApg6ATIgQAFIgjAGIgDABIgIAAIgIgFIgBgBIgCADIgDAJIgCADQAfAcAWAbIAIAKIAJALQATAfgEAXIgDALQgLAWgmAYIgRAKQgWANgSAFQgcAIgXgGIADgBIAAgBQgBAAgBAAQAAAAgBAAQgBgBAAAAQgBAAAAgBQgCgCAAgDIgJACIgCgGIgDgMQgCADgEABIABARIgBAAIABADQACAKgDAHIAAABQgBAJgEAIQgPAqg4AXQgpAPg+AAQhrgBg9grgAg5GyIAAgBIgKAAIAKABgAAmGjIABABIABAAIAAgBIgCAAgAAcCVIABAAIgEgCIADACgAEBBzIgKgCgADtjgIAAgBIgDgCIADADgAEKk/IAJABIABgCIgKABgAAMlhIABAAIgBgFIgBAAIABAFgAg3nTIAEADIgIgIIAEAFgAC9EPIgOgQIgPgOIAAgBIgHgJIgNgOIAGgEIgGAEIgEgDIAKgBQAcgBATgFQAagGAUgNIAGgDQAYgRAKgXIAEgKIABgIIABgGQACgXgKgbQAcAKAaAGQAbAGAZACIADAAIAZABIABAAIAAAAQAZAAAXgEQgXAEgZAAIAAAAIgBAAIgZgBIgDAAQgZgCgbgGQgagGgcgKIgEgLIgFgKIgSggIALAAQAfAAATgBIAOgCIAGAEQAaAUAaAPQAnAYAmAOIALAEQAmAOAmAEIADABQAnAEAmgDQhdA0A1BYQgpgOgmgIIgCAAIgjgKQgvgNgpgIIg0gJIgCAAQgogGghAAIgBAAIAAAAIgPAAIgBAAIABAAIAPAAIAAAAIABAAQAhAAAoAGIACAAIA0AJQApAIAvANIAjAKIgjgGQgtgFgrACQgaACgaAEQg7AMg5AbIgMAHIgDABIADgBIgDABIgEACIgHgJgAH7C1Ijfg2gAEVBHIAAAAgAF8gxIAAAAg");
	this.shape_7.setTransform(53.2877,49.1508);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AiDI4QgggHgagNQgSgKgPgLQgpgfgLgwQgLgkAMgfIgDgEQgMgWAAgeQgnAHgigCQgugCgngSQgqgTgWghQgbgmAGgyQAHgwAjglQAggjAzgTQAbgKAcgEQgOgEgNgGQgsgRgqgsQgugzgMgzQgOg/AkgvQATgZAhgPQAfgOAkgDQAhgCAiAHQgFgIgEgKQgKgeACggQADggAPgdQAjg9BVgiQBXgiBKAUQAtANAiAhQAQAQAMATQAUAOAQAWQAGAJAFAKIAGgEQAUgRAUgGQAPgDAQAEQAQgIAZADQAdAEAVAVIAHAHQAZAAAWAEQBHAOAfAvQARAbgEAbIADACQAWAQgCAdQgBAUgSAbQgJAQgLAOIAUANQA0AmAOAwQAJAfgLAYIgGALQgKAQgTAJQgQAIgXAEIgPACQgTABgfAAIgLAAIASAgIAFAKIAFALQAJAbgBAXIgBAGIgCAIIgEAKQgKAXgYARIgFADQgVANgZAGQgTAEgdACIgJAAIgIABQARANAPANIAOAPIAOAQIAIAJIABACIgXAKIgIgLIgIgKQgWgbgfgcIABgDIAEgJIACgDIABABIAHAFIAIgBIADAAIAkgGIAPgFQA7gTARgpIACgFIACgJQACgJgBgLQgBgRgHgVIgEgOIgBgCIgNgdIgEAAIgWAAIAMgDIANgCIgDgGQACgCADgEIABAAIADAEIADAGIALgBIAdgDIAQgCIABgBIAIgBQAXgEAPgJQASgLAJgQIAEgMQAHgbgTghQgPgbgcgaIgHgHIgJgHQgEgEgFgBIAIgKQADgEgCgFQALgRAKgSQASgmgMgUIgGgHQgIAcgcANQAPgMAHgSQADgKABgIIgDgCIgBgIIAEABIgBgKQgHgmgugZQghgUgzgIIgDgBIAFAOIgDAAIgKgPIgMgBQAAgHgFgDIgCAAIAHAAIgDgDQgYgRgcgCQgKAAgIABIAMAIIgDAAQgHgEgEgBIgCAAIgDgBQgKACgIAHIgBABIgJADIgEACQAEgJAIgHIAFgCIgIgBQgNABgbAOQgLAFgHAGQAEAJACAJQgFgBgFgEQgMgIgKgJQAKAEAGAGIADgEQgPgagWgWQAGANADAOQgKgZgVgVIgNgKIAGADIgMgKQgigagpgIQhHgNhOAjQg5AZgjAqQgmAvAEAxQACAbAQAUIAQAGQgHgBgDACQgFABgBAFIgCAIIgNgPQgpgFgjAHQgiAHgbATQgdAUgMAcQgRApAUAzQAMAcAWAfQAjAwAnAYQAaAOAZAHIAVgBIgOACQAYAFAXgDQghAJgjgGQhNAUgsAvQgeAggIApQgIAqAVAjQASAeAlAUQAiASArAEQAdAEAjgCQABgSAFgYIABApIAKgBQAcgDA0gJQgvASgqAIQACAUAFARIAEAJIAGgJIgEALIADAHIAAAQIgHgIQgEAYAKAaQAOAoAkAaQA9ArBsABQA9AAApgPQA4gXAQgqQADgIABgJIABgBQADgHgDgKIAAgDIAAAAIgBgRQAEgBADgDIADAMIACAGIAIgCQAAADADACQAAABABAAQAAAAABAAQAAAAABABQAAAAABAAIABABIgEABQAXAGAcgIQASgFAXgNIARgKQAlgYAMgWIADgLQAEgXgUgfIAXgKIAAAAIABADIAJAOIAGANQAFAOAAAOIgCAIIgEAOIABgyIgBAyQgDAGgFAGQABACgHAIQgHAHADgGIgJAJIAFguIARgxIgRAxIgFAuIgOAKIATg4IAFg0IgFA0IgTA4IAAABIgyAIIAygIIgUALQglAUgdAEQgjAGgYgNIgIADQADASgDAQQgKAwg2AfIgCAAQgoAWhDAGIgaABQgpAAglgJgAFDEnIADgLIgDALIACgOIgCAOgAB1mlIACACIAFAFIgFgKIgCADgAA8GwIAJAAIAAABIgJgBgACmGjIAAgBIACAAIAAABgAErGUIAAAAgAFUFpgAFDEngAFFEZgACcCUIgEgCIAEACgAFpjkIAEACIAAABIgEgDgAGJlAIAKgBIAAACIgKgBgACMliIgCgFIACAAIAAAFgABInUIgEgFIAHAIIgDgDg");
	this.shape_8.setTransform(40.5281,49.2817);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},8).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},6).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.7,-8.3,129.7,115.3);


(lib.smile = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("ABpt8QGEpIJkiIICgDcQpEAbpEHZgAP4usIDRhwAERjJQD/FSDgggQCagWCLjDQCEnDihl5AERjJQgCkDERAmQFQBaiAG1AERjJQhfh+hiivIOom2A5N2sQJzAwHsHEQjZp3sOjRgA3VxsQAyBwBHBZQEGFJIYAKQgtJimzgLA3youQgXFXHrDeQC+j3i+jUQjEkGkQCcgA1cujQiLDKgLCrAmeG+QB/ErEkjHAVoJeQBMBdCah7AUOEUQhAEUCaA2ArKWcQKZM+PNxMIHMow");
	this.shape.setTransform(161.425,179.2722);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ALygEQkRgmABECQheh+hjiuIOpm2QChF5iFHCQiLDEiZAWQB/m2lPhZgAtMGpQC+j4i+jTQjFkGkQCcQALirCMjKQEFFJIZAKQgtJXmkAAIgPAAg");
	this.shape_1.setTransform(140.4908,137.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6B3F1B").s().p("AKBA1QgBkCERAmQFPBah/G1QgUACgTAAQjPAAjqk1gAyCkvQEQicDFEGQC+DTi+D4QnrjfAWlWg");
	this.shape_2.setTransform(124.5812,153.7868);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AT/kNIChDcQpEAapEHZQGDpHJkiIgA2fhtIB4lUQMPDRDZJ2QntnDpzgwg");
	this.shape_3.setTransform(143.95,45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.smile, new cjs.Rectangle(-1.5,-1.5,325.9,361.6), null);


(lib.Scene_1_מטרה = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// מטרה
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#990000").ss(1,1,1).p("AAAgeQANAAAJAJQAJAJAAAMIAAAAQAAANgJAJQgIAIgMABIgBgeIAegBAgeADQAAgCAAgBQAAgMAJgJQAJgJAMAAAACAfQgBAAgBAAQgMAAgJgJQgIgIgBgLIAfgCIgBgf");
	this.shape.setTransform(153.725,458.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag2B3IAAAAIAKgEIAOgDIgBABQgHAGgEACIgRACIAFgEgAAxg6IAAAAIgBABIABgBgAA8hwIAAgJIAAANIAAgEg");
	this.shape_1.setTransform(122.2875,477.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#990000").ss(1,1,1).p("AAAgeQANAAAJAJQAJAJAAAMIAAAAQAAANgJAJQgIAIgMABQgBAAgBAAQgMAAgJgJQgIgIgBgLQAAgCAAgBQAAgMAJgJQAJgJAMAAgAABABIAegBAACAfIgBgeAgeADIAfgCIgBgf");
	this.shape_2.setTransform(153.725,458.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#990000").ss(1,1,1).p("AAfAAIAAAAQAAANgJAJQgIAIgMABQgBAAgBAAQgMAAgJgJQgIgIgBgLIAfgCIgBgfQANAAAJAJQAJAJAAAMgAgeADQAAgCAAgBQAAgMAJgJQAJgJAMAAAACAfIgBgeIAegB");
	this.shape_3.setTransform(155.675,449.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#990000").ss(1,1,1).p("AABABIgBgfQANAAAJAJQAJAJAAAMIAAAAQAAALgGAIQgCABgBACQgGAGgIACQgDABgDAAQgBAAgBAAQgMAAgJgJQgIgIgBgLIAfgCIAegBAgeADQAAgCAAgBQAAgMAJgJQAJgJAMAAAACAfIgBge");
	this.shape_4.setTransform(154.125,457.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(1,1,1).p("Au8FSIAAqjId5AAIAAKj");
	this.shape_5.setTransform(-319.625,216.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#990000").ss(1,1,1).p("AACAfQgBAAgBAAQgEAAgFgBQgHgDgFgFQgIgIgBgLQAAgCAAgBQAAgMAJgJQAJgJAMAAQANAAAJAJQAJAJAAAMIAAAAQAAALgGAIQgCABgBACQgGAFgGADQgBAAgBAAQgDABgDAAIgBgeIgBgfAABABIAegBAgeADIAfgC");
	this.shape_6.setTransform(148.425,454.325);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#990000").ss(1,1,1).p("AgeADQAAgCAAgBQAAgMAJgJQAJgJAMAAQANAAAJAJQAJAJAAAMIAAAAQAAALgGAIQgCABgBACQgGAFgGADQgBAAgBAAQgDABgDAAQgBAAgBAAQgEAAgFgBQgHgDgFgFQgIgIgBgLIAfgCIAegBAABABIgBgfAACAfIgBge");
	this.shape_7.setTransform(148.625,456.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},167).to({state:[{t:this.shape_1},{t:this.shape_2}]},3).to({state:[{t:this.shape_1},{t:this.shape_3}]},3).to({state:[{t:this.shape_1},{t:this.shape_5},{t:this.shape_4}]},5).to({state:[{t:this.shape_1},{t:this.shape_6}]},26).to({state:[]},31).to({state:[{t:this.shape_7}]},24).wait(62));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.replay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(20.95,33.6,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_28();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_32();
	this.instance_2.setTransform(89.15,28.3,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_31();
	this.instance_3.setTransform(-24.9,-25.45,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_30();
	this.instance_4.setTransform(-17.05,2.3,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_34();
	this.instance_5.setTransform(19.75,32.2,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_33();
	this.instance_6.setTransform(0,0,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_36();
	this.instance_7.setTransform(24.45,34.5,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_35();
	this.instance_8.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]},1).to({state:[{t:this.instance_6},{t:this.instance_5}]},1).to({state:[{t:this.instance_8},{t:this.instance_7}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.9,-25.4,261.09999999999997,219.4);


(lib.play = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(29.5,45.2,0.3298,0.3298);

	this.instance_1 = new lib.CachedBmp_19();
	this.instance_1.setTransform(0,0,0.3298,0.3298);

	this.instance_2 = new lib.CachedBmp_23();
	this.instance_2.setTransform(94.3,31.5,0.3298,0.3298);

	this.instance_3 = new lib.CachedBmp_22();
	this.instance_3.setTransform(-15.85,35.45,0.3298,0.3298);

	this.instance_4 = new lib.CachedBmp_21();
	this.instance_4.setTransform(-17.05,2.3,0.3298,0.3298);

	this.instance_5 = new lib.CachedBmp_25();
	this.instance_5.setTransform(22.75,41.35,0.3298,0.3298);

	this.instance_6 = new lib.CachedBmp_26();
	this.instance_6.setTransform(0,0,0.3298,0.3298);

	this.instance_7 = new lib.CachedBmp_27();
	this.instance_7.setTransform(22.75,41.35,0.3298,0.3298);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]},1).to({state:[{t:this.instance_6},{t:this.instance_5}]},1).to({state:[{t:this.instance_6},{t:this.instance_7}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,0,209.3,194.3);


(lib.girl2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AieiBQhHg4hChcQEJBGEbigQAcAoAKAnQAKAogIAnABpiWQAWABAXAIABpiWQA9hoB/AtAieiBIHBifAhBhIQCAA5CPgzQBJhHAOhIAjjFwICBgaIBHiSAieiBQAuAkAvAVQBVhTBVAF");
	this.shape.setTransform(93.2404,206.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#66CCFF").ss(3,1,1).p("AAvAAQAAAUgOANQgOAOgTAAQgTAAgOgOQgNgNAAgUQAAgSANgOQAOgOATAAQATAAAOAOQAOAOAAASg");
	this.shape_1.setTransform(175.05,142.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(3,1,1).p("AFhxeIBQBlQADCTgLB/QgkGNisDHQhHBRhdAwQCAFZDqgmQAYgDAZgIQBPgOBSAhAHbxAQAzBjgzBjApg/oQABgBACgBQJUmoKELUQCZGdiZExQGYGNkZETQDSE/mAA4QkYFghboaAFhxeQAWi9BbAgQCAAjgiHrQhMB1g7hvACZ1bQBTgRBUglAqP/FQAXgSAYgRQkZiziqGXQkpHlDNJmAsNG9QlhBWB6mFQi+A3gjjtQAWjPDjhHIijl7QAIAZAJAaACZ1bQmNBPlemkQhQH3lSHCQDFMeG/AqQC8ARDph0AqKyzQCRgpA9DXAhJy6QDygiALENAmNBfIgqCDQhFABg9AZIAIAxQAtCvCYB5IKHAAQAUiaBwiaAsNG9QAOgTAPgRQBRhyBmgrArwGZQAeEqCjBQQDRIVhKKPILiAEIAAgVQBskjEfBDQCHhFBGhVAG2KFQAojSCTiKAG2KFIGbGkQDwEwivDTEAMTAgBQAdBZBdhZIAKi8QHMmbiJkgQlDrnkmh6AG2KFQF1HkBnHDACZ1bIDID9AMTeLIAAB2AJme7IAYgwIAAAwIAAA5QAwB2BlhpAH2doIgnBTIAABPQgQAmB5gYIAuhdIAYAAAovMTQj7BlAhTcQhLBGgQhWQABgQgEgUEgTnAhQQgxhOBVhOQBCgyBCAyQgCxkE0mTEgTnAhQQANAVAqAQQBNgbA+hEQg0BABAAWQAuAKAuhJQAIgMAIgPEgO9AgtQgSAtAiAuQBGgMADg4EgQZAgJQgHAHgFAGEgTnAhQQBoiQApAfAE6e7QBBCNBUg+");
	this.shape_2.setTransform(127.3599,218.3734);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#990000").s().p("AjjAzIHBieQAKAogIAnQh/gtg9BnQhUgFhWBTQgvgVgugkg");
	this.shape_3.setTransform(100.1154,188.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF9999").s().p("AhfA3QgGgLAPgVIAGgHQAWgYAogXIAKgGQAhgSAdgGQAigHAHAOQAHALgPAVIgGAHQgWAZgoAXIgIAEQgjATgeAGQgKACgIAAQgRAAgGgJg");
	this.shape_4.setTransform(149.7629,170.5861);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C34766").s().p("An5SDQBKqPjRoUQijhQgdkqQBQhyBmgrIAIAxQAtCvCYB5IKHAAQAUiaBxiaQAXgDAZgIQBPgOBSAhQiTCKgoDSQF1HjBnHDQhFBViIBFQkehDhtEjIAAAVgAnnvwQBVhTBVAGQAXABAWAHQgWgHgXgBQA9hoCAAtQgPBHhIBHQhEAYhAAAQhIAAhEgeg");
	this.shape_5.setTransform(135.45,300.3955);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AklgcQEKBFEbifQAcAoAKAnInBCeQhHg4hDhbg");
	this.shape_6.setTransform(92.975,181.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0066").s().p("AFaDFIgCADIABgEQgLgMgUgLQgigVgKgMQgngtgwhDQgfgpAPhBQAJgpAYgOQAUgMAgAHQAtAIAUAeQASAdAGAhIAEgDQgJgSAFgXQAFgUARgXQAYgeAZgFQAbgGAaARQAWAPANAdQAXA0gRAzQgKAdglAuQg0BAgtAnIgFAHIgJAMQAEAGADAHIgJgLgAj6ClIgZgFIgYgGQgWgHgagOIgsgcIgugcQgYgRgPgSQgegjgGguQgEgtAXgbQAbgfA2ABQA2ABAoAeQAJAGATARIADADQgEgdAHgWQAGgUAQgQQAPgPATgJQAmgRAuAHQAbAEAPAlQAbA/gVBLQgSA7gyA+IgIAMQgPAXgGAcIgIAWQgSgJgfgGg");
	this.shape_7.setTransform(97.5163,139.9602);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#1B2B38").s().p("As/PrQi+A3gjjuQAWjPDjhGIijl8QjNplEpnlQCqmWEZCyIgvAkIAvgkIADgCQJTmoKFLVQCZGciZEyQGYGLkZETQDSFAmAA4QkYFhhbocQCsjGAkmNQA7BvBMh2QAinqiAgjQhbgfgWC8IjIj9QBTgQBUgmQhUAmhTAQQmNBPlemkQhQH4lSHBQDFMeG/AqIhHCSIAqiEIgqCEQhFAAg9AaQhmAqhRBzQgPARgOATQhAAPgwAAQjbAABkk/gAkCRAIiCAaQA9gaBFAAg");
	this.shape_8.setTransform(109.2922,132.2262);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#33CCFF").s().p("AggAhQgOgOAAgTQAAgSAOgOQAOgOASAAQATAAAOAOQAOAOAAASQAAATgOAOQgOAOgTAAQgSAAgOgOg");
	this.shape_9.setTransform(175.05,142.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E9C19A").s().p("Au9dCIAQgbIgQAbQguBIgugJQhAgWA0hAQg+BEhNAbQgqgRgNgUIAFgHIAGgIIAJgLIAAgBIAFgGIAAAAQBBhTAkgDIADAAIAAAAQAIAAAHAFIABABIgBgBQgHgFgIAAIAAAAIgDAAQgkADhBBTIAAAAIgFAGIAAABIgJALIgGAIIgFAHQgxhOBVhOQBCgyBCAyQgCxkE0mTQAOgTAPgRQAeEqCjBQQj7BlAhTcQhLBFgQhVIABgGQAAgOgEgQQAEAQAAAOIgBAGQgDA4hGAMQgiguASgtgAwlcrIAMgNIgMANgAJ+cJIAAg5IAAgwIgYAwIguBcQh5AZAQgmIAAhPIAnhTIgnBTIAABPQhUA+hBiNIAAgVQBskkEfBEQCHhGBGhUQCvjTjwkxImbmjQAojSCTiKQEmB6FDLmQCJEhnMGbIgKC8QhdBZgdhZIAAh2IAAB2QgvAxgkAAQgoAAgag+gAlsFqQiYh5gtivIgIgxICCgZIBHiSIADABIAAAAQAXACAYAAIAAAAIAAAAQCmAADHhjIADgCIAAAAIAAAAIADgCIgDACIAAAAIAAAAIgDACQjHBjimAAIAAAAIAAAAQgYAAgXgCIAAAAIgDgBQm/gqjFseQFSnCBQn3QFeGkGNhPIDID9IBQBkIABA3QAAB1gJBnQgkGNisDHQhHBQhdAwQCAFaDqgmQhwCagUCagAnzngQAtAkAwAVQCBA5CPgzQBIhHAPhIQAHgngJgoQgKgngcgoQkcCgkKhGQBDBcBHA4gAEWsGQgdAFgiATIgKAFQgoAXgWAaIgGAHQgPAVAGALQAIAOAhgHQAegGAkgTIAIgEQAogXAWgaIAGgIQAPgUgHgLQgFgJgQAAQgIAAgMACgAA4srQgCgGgFgGIAJgMIAGgHQAsgnA1hBQAkgtAKgeQASg0gXg0QgOgcgVgPQgagRgcAFQgYAGgZAeQgRAWgFAVQgFAXAJARIgEAEQgGgigSgcQgSgfgugHQgfgHgVAMQgXAOgKAoQgOBCAeApQAwBEAnAtQALAMAhAUQATAMAMAMIgCAEIADgDIAIAKgAsYxqQgXAbAFAtQAFAvAeAjQAPARAZASIAtAcIAtAcQAaAOAVAHIAZAGIAZAEQAfAGARAJIAJgVQAGgcAOgXIAJgMQAyg+ARg9QAWhKgbg/QgQglgbgEQgtgIgmARQgUAKgPAPQgPAQgHAUQgHAWAEAdIgDgDQgSgRgJgGQgogeg3gBIgDAAQgzAAgbAegAC0y6QgJjvjAAAIAAAAIAAAAQgYAAgcAEQAcgEAYAAIAAAAIAAAAQDAAAAJDvIAAAAgAm8zwIAAgDIgBgDQgzivhuAAIAAAAIAAAAQgUAAgWAGIgBAAIgBAAIABAAIABAAQAWgGAUAAIAAAAIAAAAQBuAAAzCvIABADIAAADIAAAAgAGpvSQAJhnAAh1IgBg3IhQhkQAWi9BbAfQCAAjgiHsQgnA8gjAAQggAAgdg2gAG7wFQgNAOAAATQAAATANAOQAOAOAUAAQATAAAOgOQAOgOAAgTQAAgTgOgOQgOgOgTAAQgUAAgOAOgAHbxmQAagxAAgxQAAgxgagyQAaAyAAAxQAAAxgaAxg");
	this.shape_10.setTransform(127.3599,241.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,257.7,439.8);


(lib.fatman_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("ATm8oQAJhiiphjQBMhiARhNQACgKACgLQAUikkNg6Qjoi9gYDLQAAAAAAABQgFArAFA8QkDg1CDELQGSAEjYFIQD6B7jXA7QD/A3hEC1QBwgUAzgnQBihNiFiZQCYhZAIhZQCbhuB0D1QgUF4CMCuQB9GFn1jtARk2dQADAGACAHQBVDiA3DLAT1viIAAgBAT1viQEfQloUHHQgDBHgNBAQg3EajlCFQx/H1oVszQgCgEgCgDEAFLgojQAOg8i1ghQBgkHlPDpQhuj4huD4QkUiKh8EWQhHAKgRAkQiyF4G+kQQCgE3Bak3QDFDtB6jtQEFhkAQhDQDShdCREAAkU0wIAABaIA4B4QkFh4gyDwQABCGBcAjQj3D/i0grQjVA/g2CKQgoBlAuCOQBdEYECAtAhB0vIAABaIgyB4QDqh5AtDxQAAA9gSApQByBbDghbQDIhnB/ECQAiBEAdBfQBpD3hpDVEgQ9gj3QAEApgEA5QDfgyhxD6QlaADC6EzQjWByC4A4QjbAyA7CpQg7DlgbCzQgQBxgEBcQgUIgB+F/QB0DkDCDAQAYAsAbApEgQ9gj3QgVi9jHCxQldBRDbE1QjZCJB8CKQiIC4BpC/QBQDDiFCTQj7EXGwgnEgQ9gj3QBbi1DTg4A345qQAhAlA8AmQivDYEdA1Am2s9QAWAJAbACQAaADAfgDQBHgGBghdQBXBeBAAGQAbACAXgCQBQgJAehFAoNKMQGqmmH3D8A2Dt6QCfJRB4h3EgiVAjtIA6iZQFrwKMslfEgiVAjtQBEAfAcAgQD6EaFQBxIAABkIsgAAQAEjrBylDgEgTbAjDQguAVg4AJIBmgeQBlDml1EOAwVfmQg7ChiLA8EgPFAmVQLEEaH1kaEAPYAj1QCJCMiJCMEAWHAorIAACWIN6AAQAvlyidj7QkmE1nmCigEASWAhoQAdD0DUDPAMrrkQEvBMCblKEgXrAsbMAtygBaAPwKRQPkCVC/Uu");
	this.shape.setTransform(231.6003,284.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#DE7E72").s().p("ACpD/QhAgGhXheQhfBdhHAGQgfADgagDQgbgCgWgJQhcgjgBiGQAyjvEFB4Ig4h4IAAhaIDSABIAABaIgyB4QDrh5AtDwQAAA9gSApQgeBFhQAJIgYABIgbgBg");
	this.shape_1.setTransform(213.225,176.9875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AufJsIgFgHQgagogZgsQjCjBh0jkQh+l+AVogQADhdARhxQCfJSB3h4QgSAvAAA4QAABAAZBNQBcEYECAtQkCgthckYQgZhNAAhAQAAg4ASgvQA2iJDVhAQC1AsD2j/QAWAIAbADQAaACAfgCQBHgGBhheQBXBeA/AGQAbADAYgDQBPgJAehFQBzBbDghbQDHhmCAEBQAiBFAdBeQA0B8AABzQAABzg0BrQA0hrAAhzQAAhzg0h8QgdhegihFQEuBMCclKQEeQmoTHHQgEBHgMA/Qg4EajkCGQm1C+lbAAQo6AAlKn9gAnsIGIACgCIADgDIACgCIAEgEQEGj9EhAAIABAAIAAAAQCtAAC4BaIACABIAHADIgHgDIgCgBQi4haitAAIAAAAIgBAAQkhAAkGD9IgEAEIgCACIgDADIgCACg");
	this.shape_2.setTransform(228.3738,297.6172);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#574F4A").s().p("A3pPhQlQhwj6kbQgcgghFgeIA7iZQFrwKMrlfIAFAHQDUKdLxAZQIvAVFomWQDvjZibi9QPkCVC+UuQklE0nmCiQjUjPgdjzQAdDzDUDPIAACWMgtyABagA3pPhQEljUAAi8QABgzgWgxQCLg8A6igQg6CgiLA8IhmAeQA3gJAvgVQAWAxgBAzQAAC8klDUgAD2K/Qj6CNkvAAQkvAAliiNQFiCNEvAAQEvAAD6iNgAPaM3QBEhGAAhGQAAhGhEhGQBEBGAABGQAABGhEBGg");
	this.shape_3.setTransform(231.45,459.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AgxGLQrygZjTqcQIUMySAn0QDkiFA4kaQCbC+jvDXQlXGCoLAAIg1gBg");
	this.shape_4.setTransform(237.0608,389.5493);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#DF986E").s().p("EgkLAqsQAEjrBylDQBEAfAcAgQD6EaFQBxIAABkgEAWHApSIAAiWQHmiiEmk1QCdD7gvFygA2DvpQAbizA7jlQg7ipDbgyQi4g4DWhyQi6kzFagDQBxj6jfAyQAEg5gEgpQBbi1DTg4QiyF4G/kQQCfE3Bak3QDFDtB6jtQEFhkARhDQDRhdCREAQgEArAEA8QkDg1CDELQGTAEjYFIQD5B7jXA7QD/A3hEC1QBwgUAzgnQBjhNiGiZQCYhZAIhZQCbhuB0D1QgUF4CMCuQB9GFn1jtQg2jLhWjiQBWDiA2DLIAAABQibFKkvhMQh/kCjIBnQjgBbhyhbQASgpAAg9QgtjxjqB5IAzh4IAAhaIjUgBIAABaIA4B4QkFh4gyDwQABCGBcAjQj3D/i0grQjVA/g2CKQgUAUgVAAQhpAAiFnugA5MwMQCFiThPjDQhqi/CIi4QAhAlA8AmQivDYEdA1Qg7DlgbCzQgQBxgEBcQg1AFgqAAQkyAADcj1gAT1xSIAAAAg");
	this.shape_5.setTransform(231.6003,295.3841);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#999999").s().p("Az7H2Qg8glghglQh8iKDZiKQjbkzFdhRQDHixAVC9QAEApgEA4QDfgxhxD4QlaAEC6EzQjWByC4A4QjbAyA7CpQkdg1CvjZgAOrHVQDXg7j6h7QDYlImSgDQiDkLEDA1QgFg8AFgrIAAgBQAYjLDoC9QENA6gUCkIgEAVQgRBNhMBhQCpBjgJBiQgIBZiYBYQCFCahiBNIgFgNIAFANQgzAnhwAUQBEi2j/g2gAUJKGIAAAAgAljllQm+EPCyl3QARgkBHgKQB8kWEUCKQBuj4BtD4QFQjqhgEIQC1AhgOA8QgQBDkFBkQh7DtjEjtQgtCbg/AAQg+AAhQibg");
	this.shape_6.setTransform(215.6298,77.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.fatman_1, new cjs.Rectangle(-1.5,-1.5,466.2,571.6), null);


(lib.boycopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(2,1,1).p("AAHAAQgHAAgGAC");
	this.shape.setTransform(117.95,266.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#9E7246").ss(0.1,1,1).p("Ah7ATQCYBDBfh/");
	this.shape_1.setTransform(231.95,200.6231);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(0.1,1,1).p("AKynLQjCiVjbA8QgCABgDAAQgeAIgeANIgWiDIAAgOQDhhtEqE0gAqXkGQB/j8FcgeIg+h8Qk5AaiVF8gAi+jFQAJgBAJABQABADABACQgtADguAOAoIAGQAxg1AygoQAUgPAUgOAisjFQh5lci7CZQivCZDqCYADQjWQgjgCgkAIAisjFQAVAAAVAEAGuhtQgNgLgMgKAIGgQQgsg2gsgnADQjWQBsljCmCbQCbCYjPCZAEZjIQgkgMglgCAFwJPQA5g6A1hLAi7F/QAIhsAMhyQFGETHyk7QhUDHhfCKAi7F/QgFBPgCBMQCThOBYBVQAcAbAXAtAjCIaQgBA/AAA+QCbA7CpgjQCrgjBEg9AApIhQCph6CeCoAi7F/QFvhVEqCg");
	this.shape_2.setTransform(218.025,188.3576);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(2,1,1).p("AlsJeIiNCOIAAh+Ih1BIIAAi8IjJA/IApkiQjSiVBBqEQAHntF0jgQFTjIIHBFQILglFDmrQADgEADgEQANgHAMgGQHbjsBBIHQARBriRBpQDYBCgUDCQAdC9lXDhQr8HovJmgQgxMjlhhRQCPEbCTDPQCeDaCjCFQGQFFGYiVQAbBdAtAPQATgXASgcQBGAGAiA1QIRgNEzKuAoXnbQiaCrAzEeAhvP6IgUAGIgGABQgEgCgFgCQhCgdg4AhQgXAMgVAXQgHAIgIAJQC6GiDvAIAhvP6QAqgCAag7AnfZaQg9CghNCIAJYZUQE6AZBekUQgDhLgbgtAIlVHQCiApB+iXAD1VHIEwAAQhcCkCPBpIAeEuAgWeCIDVmXIAUglQALgNAHgWABjXfIAJAAQABAAABAAQABAAABAAQABAAAAAAQBWgJAegzQABgBAAgBQAMgXADggQACgRgCgSAL9RtQFFh3E/mvQEgqwjYo9AhvP6QA9EVEnA4AlkQ7QtygJo/GF");
	this.shape_3.setTransform(151.4,158.9473);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#6699FF").s().p("AmIBoQgZgHgTgTQgdgdAAgqQAAgoAdgeQAdgdAqAAQApAAAdAdQAdAeABAoQAAAUgIASQgHASgPAPQgdAdgpAAQgPAAgMgDgAl0AGQgIAJAAAMQAAANAIAIQAKAJAMAAQANAAAIgJQAJgIAAgNQAAgMgJgJQgIgIgNAAQgMAAgKAIgAFUBZQgZgGgUgUQgTgTgGgZQgEgMAAgNQAAgqAdgdQAegdApAAQAqAAAdAdQAdAdAAAqQAAATgGARQgIASgPAPQgTAUgZAGQgMAEgPAAQgNAAgNgEgAFQgIQgJAIAAANQAAAMAJAJQAIAJANAAQAMAAAJgJQAJgJAAgMQAAgNgJgIQgJgIgMAAQgNAAgIAIg");
	this.shape_4.setTransform(219.15,166.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("ApqQVIDWmXQALgEAKgGQAfgWADgvQABgNgBgaIgBgLQABgRgBgSIEwAAQhdCkCPBpIAeEugAmavOQC7iaB5FcIgCAAIgDAAIAAAAIgBAAIgGAAIgGAAIAGAAIAGAAIABAAIAAAAIADAAIACAAIACAGQgtACguAPQAHgSAAgUQAAgpgegeQgdgdgpAAQgqAAgdAdQgdAeAAApQAAAqAdAdQATATAZAHQgUANgUAQQjqiZCviYgAHbrJQAYgHATgTQAPgPAIgSQAHgRAAgUQAAgqgegdQgdgdgpAAQgqAAgdAdQgdAdAAAqQAAAOADAMQgkgMglgCQBsljCmCbQCbCZjPCYIgZgVg");
	this.shape_5.setTransform(211.0016,246.6446);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF6666").s().p("AAxB3QgwgVgvgyQgvgxgVgwQgTgyATgUQATgTAvAUQAvAVAwAyQAuAxAVAxQAVAxgUAUQgJAKgQAAQgRAAgYgLg");
	this.shape_6.setTransform(141.6,213.0875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#DFDBCD").s().p("AmlBdQAHhqAMhyQFIESHxk7QhVDHhfCKQkpiglvBUg");
	this.shape_7.setTransform(241.5,217.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0D8672").s().p("AJ2GnIgekvQE6AZBekTQgChLgcgsQIQgNE0KtgAppGnQBNiJA9igQg9CghNCJIysAAIAAnLQI/mFNyAJIAIgCQgIAKgIAMQALgNANgKIANgCQC6GhDvAHQgYABgJACQAaABAwAKQAeADAWgFIjVGYg");
	this.shape_8.setTransform(151.4,308.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#3BB08D").s().p("AEEEsQiQhpBdikQCiApB+iWQATgXASgcQBGAGAiA1QAcAtACBKQhXD9kOAAQgYAAgbgCgAjwC3IgBAAQjwgIi6mhIAQgRIAKgFQA3gbBtgDIAOAAIgIgBIAUgGQA9EVEoA3QACASgCARIgBgcQgFAMgCAVIgEAjIgDAPIgBACQgeA0hWAIIgBAAIgCAAIgCAAg");
	this.shape_9.setTransform(185.4,290.9078);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#82191D").s().p("AhkBJQhYhUiTBNQAChLAFhPQFvhVEpCgQg1BKg4A6QieinipB5g");
	this.shape_10.setTransform(232.175,235.5868);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#C35363").s().p("AkZBCIABh8QCThOBZBVQAcAbAWAsQgWgsgcgbQCoh6CeCoQhEA8irAjQg/ANg+AAQhmAAhhglg");
	this.shape_11.setTransform(226.625,248.0628);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AlvPBQgxgKgagBQAKgCAXgBIABAAIAJAAIADAAIACAAIABAAIAVgBQAuAAAVgQIAKgIIgVAlIAVglQAKgNAIgWIAAAAIABgCIACgPIAFgjQABgVAFgMIABAcIACALQABAagBANQgDAvgfAWQgKAGgMAEQgNADgQAAIgWgBgAkUN1QAMgXACggQgCAggMAXgAtYINQARgXATgNQAUgNAYgHQAWgHAbgBQAfgDArAHIAPADIgGABIgJgEIAJAEIAGgBIAHABIgNAAQhuADg2AbIgLAFQAVgXAWgMQgWAMgVAXQgPAIgOAMQgMAKgLAMQAIgLAHgKgAjKmxQgIgIAAgNQAAgMAIgJQAKgJAMAAQANAAAIAJQAJAJAAAMQAAANgJAIQgIAJgNAAQgMAAgKgJgAH6m/QgJgJAAgMQAAgNAJgJQAIgIANAAQAMAAAJAIQAJAJAAANQAAAMgJAJQgJAJgMAAQgNAAgIgJgAoqoLQCWl8E4gbIA/B9QlcAeiAD8gAG0sqIgFACQgeAIgeAMIgXiCIAAgOQDihuEqE1IgXAMQjCiVjbA8g");
	this.shape_12.setTransform(202.15,214.5338);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EDBAA0").s().p("ABZPzIkvAAQkog4g9kVQArgCAZg7QijiFidjaQiUjPiOkaQFgBRAxskQPJGgL8noQDZI9khKwQk+GvlFB3QAaBdAtAPQhjB2h5AAQghAAgjgIgAAyNIQB+AAB/guIADgBIgDABQh/Auh+AAIAAAAIAAAAQkPAAkNjVIgHgGIgGgEIAGAEIAHAGQENDVEPAAIAAAAIAAAAgAATFRQgFBQgCBLIgCB+QCbA7CrgkQCqgjBFg9QA4g5A1hMQBfiJBVjIQnyE7lIkSQgMBygHBrgAqgBRQgTAVAUAxQAUAxAvAyQAwAxAwAVQAvAWATgVQAUgUgVgwQgUgygvgxQgwgzgwgVQgYgKgRAAQgQAAgJAJgAFAB3QBWAAA/hTIABgBIgBABQg/BThWAAIAAAAIgBAAQgtAAg0gXQA0AXAtAAIABAAIAAAAgAk6gnQAyg2AygnQgyAngyA2gAJ8ibQAsAoAsA2Qgsg2gsgoQDPiYiaiZQinibhrFjIgDAAIgDAAIgBAAIgHAAIAAAAIgBAAQgbAAgaAFIgBAAIgCABIACgBIABAAQAagFAbAAIABAAIAAAAIAHAAIABAAIADAAIADAAQAkACAlAMQAGAZATATQAUAUAZAGQAMAEAOAAQAPAAAMgEIAZAVIAAAAgAkSm1QivCYDrCZQAUgQAUgNQAMADAOAAQAqAAAdgdQAPgPAHgSQAugPAtgCIgCgGQAVAAAVAFQgVgFgVAAQhTjyh0AAQgzAAg6AwgAn6kzIAxAAQB/j8FcgeIg+h9Qk4AbiWF8gAOBn5IAXgMQkrk1jhBuIAAAOIAXCCQAegMAegIIAFgCQA/gRA9AAQCXAACKBqgAAijzIAAAAg");
	this.shape_13.setTransform(197.3612,192.9462);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#744516").s().p("AujS5Ih2BIIAAi8IjIA/IAokiQjSiVBCqFQAHnsFzjgQFTjIIIBFQIKglFDmrIAGgIIAZgNQHbjsBCIHQAQBriRBpQDYBCgUDCQAdC9lXDhQr8HnvJmfQgxMjlghRQCOEbCUDPIiNCOgAwpI4QgNhHAAhBQABjBB0iAQh0CAgBDBQAABBANBHg");
	this.shape_14.setTransform(194.0846,100.2223);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31,-34.2,364.8,386.4);


(lib.boy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(2,1,1).p("AAEAAQgEAAgDAB");
	this.shape.setTransform(112.625,170.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#9E7246").ss(0.1,1,1).p("AhBALQBQAmAzhI");
	this.shape_1.setTransform(173.175,132.6005);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(0.1,1,1).p("ACU0hQhnhUhzAiQgBAAgCABQgQAEgQAHIgMhKIAAgIQB3g+CeCvgAlBrrQgBAkAAAjQBTAiBagUQBbgUAkgjAjErnQBahFBUBfQAdggAcgrAjErnQAPAQAMAZAk9tDQAEg9AGhAQCuCbEIiyQgtBxgzBOAo6yxQBDiPC5gRIghhGQimAPhPDXgAk9tDQgDAtgBArQBOgsAvAwAjBFWIABAAIgGAjAK9RFIBiiBANMWaIARAQAOrWJIAOgQAQOVqIAAgNAwMUXIPzAiAk9tDQDDgwCdBb");
	this.shape_2.setTransform(187.65,230.939);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(2,1,1).p("AmMnMIhLBRIAAhIIg/ApIAAhqIhqAjIAVikQhvhVAjltQADkYDGh/QC0hxEUAnQEUgVCsjyQACgDABgCQAHgEAHgDQD8iGAjEmQAIA9hNA8QBzAlgLBuQAQBri2CAADxhkQAKgNAJgPQAmADASAeQF+gKCkLTID8KqIA1BPIhqB4IAJAKIA+BGQgkBhAeBaQACAIAEAIIAABAQA0BLAdhHQAFgNAEgRADLihQAOA1AYAIABzByQCmAPAyicQgBgrgOgZADLihQCshDCpj1QCamGhzlFQmWEVoCjsQgaHHi7gtQBLCgBPB1QBTB8BXBLQDVC5DYhVgAkGjiIgLADIgDABQgCgBgDgBQgjgRgeATQgMAHgLANQgEAEgEAGQBjDrB/AFAkGjiQAWgBAOgiAiWAwIACAAQAxgDASggQAAAAAAAAQAHgNABgRQABgKgBgKIChAAQBWAXBDhWAm1LgIFQqpIAKgVQAGgIAEgMAkGjiQAgCdCdAgAnnwxQhSBhAbCiAiGN3QAihhBfgVQBOgmgIA+IgoAxAjXMnIBRBQIAACpIheAVQiXAGiFgCQgkGnh4DXImSAAQhwkcCEmbAm1LgIDeBHIgNEOAs7JlQhJAshVAcAmIi9QrhgIlNIkQg4B+AOClQAYEYGuBmAoAQ5QlCgGjYgzAs7JlIGGB7AnKB2Qh5FXj4CYABBMZIA+gdQAqgLAAAoQACAKgDALQAWgTARgHQAogRAPArQAIAngUAeAC0OiQAxgTAVgcQBegvgjBiIhsBuQAQGCB9FCIEiAAIgOg2QgonGixnGQgGAdgHAZAB4NkQAogdAIgZABzByIA8KDAGRMWQAeibAGj3QCbLgFmE9ARaUUIikCNASPVjIBCCgQA/gUAnAUQCGAfAnCjQACBrhFgZQgTgMgPgOAQlXbIhvg6ATJbgIAABjQACAEADADQAvA7AghCIgCgbIgFhIIAUA4IAJAaQBIBHADhvQABgGAAgHARsc2IgshJQAOgcAYAVAVJabQALA6AqAoIABAAAiGQgQEABPBPhbABYglQgxBcBMA7");
	this.shape_3.setTransform(150.7868,189.376);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("An5NeQB4jXAkmnQCFACCXgGIBegVQEBBPBPhbQAPGCB+FCgAgzgxIjehHIFOqpQAGgCAFgEQAQgMACgbIAAgWIgBgGQABgKgBgKICiAAQgxBdBMA7IA8KDIABAAIgHAkQAAgogqALIg9AdQAHg+hOAmQhgAVghBgg");
	this.shape_4.setTransform(134.45,275.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF6666").s().p("AAaBDQgZgMgZgcQgZgbgLgcQgKgcAKgLQAKgLAZALQAZAMAZAdQAZAbALAcQALAbgLAMQgFAGgIAAQgJAAgNgHg");
	this.shape_5.setTransform(125.1875,139.6625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#DFDBCD").s().p("AjgA1QAEg8AHhAQCuCaEHiyQgsBxgzBNQidhajEAwg");
	this.shape_6.setTransform(178.25,142.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0D8672").s().p("AIaPNQh+lDgPmCIBrhtQAjhjheAvQAUgdgHgoQgQgpgnAQQgSAHgWASQADgLgCgKIAHgiIgBAAIg8qDQCnAOAxicQgBgrgOgZQF+gKCkLUID8KoIikCOQllk+icreQgGD3geCZIgMA3IAMg3QCxHGAoHGIAOA3gAtqOrQhxkcCFmaQmvhngYkXQAUgHgBgDQgdiZA0iAQFOokLgAHIAEgBIgIAMQAFgHAHgFIAIgCQBiDtB/AFIgSABQANABAaAFQAQACAMgDIlOKqIDeBFIgOEPQiXAFiFgCQlCgFjXgzQDXAzFCAFQgkGoh4DWgAjxgqImHh8QD4iYB6lXQh6FXj4CYQhJAthUAcQBUgcBJgtgAk9EtIAAAAgAp4img");
	this.shape_7.setTransform(131.25,267.325);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#3BB08D").s().p("AIrMmICkiOIA1BQIhqB3gAphCrIBRBRIAACpIhfAUgAkXoJQhMg7AxhdQBWAXBDhWQAKgNAJgPQAmADASAfQAOAZABAqQgtCQiQAAIgbgCgAohpKQiAgGhijsIAHgKIAGgDQAdgPA7gBIAHgBIgFAAIALgEQAhCdCcAgQABAKgBAKIAAgQQgCAHgBAMIgDAUIgCAIIAAABQgRAfgyADIgCABg");
	this.shape_8.setTransform(190.25,252.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#82191D").s().p("Ag1ApQgugvhPArIAEhXQDDgwCeBbQgcAqgfAgQhThehaBEg");
	this.shape_9.setTransform(173.3,152.4182);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C35363").s().p("AiVAmIABhGQBOgsAvAwQAPAPALAZQgLgZgPgPQBZhFBUBfQgkAhhbAUQghAIghAAQg2AAg0gVg");
	this.shape_10.setTransform(170.35,159.4973);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF0066").s().p("ADRCRIgDgCIgFgJIACACIgCgEIgEgIQgYgfgggXQgVgRgngsQgOgQgGgJQgLgPgBgPQgEgbAYgdQASgYAVgGQASgEAVAIQAQAGAPARQAYAbAGAjIAMgiQAJgVANgLQANgJAQgCQAQgCAQAFQAjAMALAeQAMAfgVAsQglBOhQA1IgJANIgEACIgBgBgAhhB+IgJgEIACAAIgEgCIgHgEQgmgKgngBQgbgBg7gOQgVgFgKgEQgRgGgJgLQgTgUACgmQABgcAOgRQALgPAWgFQAQgEAXAFQAiAHAaAZIgKgjQgFgWAFgQQAEgPANgLQAMgLAPgFQAjgLAbASQAcASAIAwQARBVgjBaIAAAPQAAABAAABQgBABAAAAQAAABAAAAQgBAAAAAAIgBABIgDgBg");
	this.shape_11.setTransform(168.9189,112.5057);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AjDIhQgagGgNAAIASgCIAAAAIACAAIARAAQAYAAAMgKIAEgEIgKAVQgHACgIAAIgNgBgAinIggAidILQAHgIADgMIAAgBIAAAAIACgJIADgTQABgMACgHIAAAQIABAGIAAAWQgCAbgQAMQgFAEgGACgAiTH2QAHgNABgSQgBASgHANgAnGEqQAJgNAKgIQALgHAMgEQAMgEAOgBQARgBAWAEIAIABIAFABIgHAAIACgBIgCABIgGgCIAGACQg7ACgdAPIgGADQALgNAMgHQgMAHgLANQgHAEgIAHQgHAGgFAHIAIgMgAlVEKIAAAAgAlVEKIAAAAgAkmkoQBQjYCmgPIAhBHQi5ARhDCPgADonLIgDABQgQAFgQAHIgMhKIAAgIQB4g+CeCvIgMAHQhnhVh0Aig");
	this.shape_12.setTransform(157.35,140.479);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EDBAA0").s().p("ALvXpIgFgGIAAhkIAABkIAFAGIgRgQQAFgMAFgSQgFASgFAMQgcBIg1hLIAAhAIgGgRQgehaAkhhIg+hGIBiiBIBCCfQA+gTAoATQCFAfAnCkQACBrhEgZQgUgMgPgOIAAgBQgqgogLg5QALA5AqAoIAAANQgEBvhIhHIgJgZIgTg5IAFBJIABAbQgQAjgVAAQgTAAgXgdgAKNXWIgshJQAPgdAXAVIAGARIAABAIAAAAgApkLAIAAipQAihiBfgVQBOgmgHA+IgoAxIAogxIA9gcQAqgMABAoQACAKgDALQAWgSARgHQAngRAQAqQAIAogVAdQgVAdgwATQAwgTAVgdQBegvgjBjIhrBtQgqAxheABQhRAAh3glgAllIEQAngdAJgaQgJAagnAdgAmGmGIihAAQidgfghieQAXgBANghQhWhLhUh8QhOh1hMihQC7AuAanIQIDDsGVkVQBzFFiZGHQioD0itBEQAOA0AYAJQg0BDhAAAQgSAAgTgFgAmannQBDAABEgaQhEAahDAAIAAAAIgBAAQiNAAiLhzIgFgEIgBgBIgFgEIgBgBIgCgBIACABIABABIAFAEIABABIAFAEQCLBzCNAAIABAAIAAAAgAmrsEIgEBYIgBBHQBTAiBagUQBbgUAkgjQAeggAcgrQAzhOAshxQkICyiuibQgGBAgEA9gAsbuVQgKAMALAcQALAbAZAdQAZAcAaAMQAZAMAKgMQAKgLgLgcQgLgcgZgcQgZgcgZgMQgNgGgJAAQgIAAgGAFgAkLt/QAuAAAhgvIAAgBIAAABQghAvguAAIAAAAIAAAAQgYAAgagMIAAAAIgCgBIACABIAAAAQAaAMAYAAIAAAAIAAAAgAhavRIADACQABABAAAAQABAAAAAAQABgBAAAAQABAAABgBIAJgNQBPg1AlhPQAVgsgMgfQgLgegjgMQgPgFgQACQgQACgNAJQgNALgJAVIgMAiQgGgjgYgbQgPgRgQgGQgVgIgSAEQgVAGgSAYQgYAdAEAbQABAPALAPQAGAJAOARQAnAsAVARQAgAXAYAfIAEAIIACAEIgCgCIAFAJgAmKviIAEAAQAAAAABAAQAAAAAAgBQABAAAAgBQAAgBAAgBIAAgPQAjhagRhWQgIgwgcgSQgbgSgjALQgPAFgMALQgNALgEAPQgFAQAFAWIAKAjQgagZgigHQgXgFgQAEQgWAFgLAPQgOARgBAdQgCAmATAUQAJALARAGQAKAEAVAFQA7AOAbABQAnABAmAKIAHAEIAEACIgCAAIAJAEgArCxyIAaAAQBDiPC5gRIghhGQimAPhPDXgAAmziIAMgHQidivh4A+IAAAIIAMBKQAQgHAQgEIADgBQAhgKAhAAQBQAABIA8g");
	this.shape_13.setTransform(198.6028,224.6105);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#744516").s().p("AnuKtIg/ApIAAhqIhqAjIAVikQhvhVAjltQADkXDGh/QC0hxEUAnQEUgVCsjyIADgFIAOgHQD8iGAjEmQAIA9hNA8QBzAlgLBuQAQBri2CAQmWEUoCjrQgaHGi7gtQBLCgBPB1IhLBRgAo1FCQgHgoAAgkQAAhuA+hJQg+BJAABuQAAAkAHAog");
	this.shape_14.setTransform(153.0677,75.6655);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,303.6,380.8);


(lib.lightnotmoving = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AjJE1QgJgUA1gfIgYhvIhpjKQg9hOAAhlQAAiDBmhcQBmhcCPAAQCQAABmBcQBmBcAACDQAAA4gTAwIhxEkAjJE1QgdA0AjARQAKACALACQAzAKAhAFQBbAGBIgEAiqFKQgZgIgGgNAC3EDIgBAAACxESIAGgPIAAAAIAhhhIgjBcAD+EvQAOgShVgaAD+EvQA2A3hBASQgJABgJABQgKACgKADQhCAMhCAEADFFFQAvgJAKgNAhaGNQg9A+BPBLQA7AfAtgfQA/gngWhg");
	this.shape.setTransform(34.825,54.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#302B2C").s().p("Ag0A9QhQhKA+g+QBaAGBIgEQAXBfhAAnQgXAQgaAAQgZAAgdgQg");
	this.shape_1.setTransform(32.8781,102.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7E7E75").s().p("Ah6BDIhUgOIgVgEQgjgSAdgyQgJgVA1geIABAAIAaALIAUAGIAEACIgBAEIACgEIAIADQBtAgBkgUIACARIAAgRIAjgJIALgEIABADIAAgBIAAgCIAQgGIAGgOIAAgBQBVAagOASQA2A2hBATIgSACIgUAEQhCANhCAEQgbABgeAAQgxAAg5gEgAjKABQgZgIgGgMQAGAMAZAIgAClgDQAvgJAKgOQgKAOgvAJgACWhGIABAAIAAABgACXhGg");
	this.shape_2.setTransform(38.0007,87.9262);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF6B00").s().p("ABoEPIgPiKQgFgpgLg0QgHgfgQg8QgSAMgXgCQgXgDgPgPQgbBGgMAlQgTA8gHAyIgHA1IgGAaIgBADIgGAQIgCAFIACgFIADgLIAAgBIAAgBQAEgPABgTIACg2QAFhSAthyQAMgbgJgNIgvhOQgOgWgGgNQgKgVgBgSQgCgaAOgJQAKgGAQADQAbAFAUAYQATAVAGAdQAJAqgQBHQANAPAVADQAWADAQgMQgSgygGgeQgLgsACglQADgqAZgLQARgIAeAMQAfANAIATQAFAKgBAPQgBAJgFARQgLAvgKAZQgQAmgXAYIAZBlQAMAxABBMIACBsIAAASgAAwkLQgPAHgDAaQgDAgALAsQAGAZAQAxQARgTAMgiIATg8QAIgZgDgMQgGgTgdgLQgLgFgJAAQgGAAgEACgAhqj9QgEACgCAIQgDASASAfIA4BhQAIgnABgUQABgggNgZQgSgfghgJIgGgBIgFABg");
	this.shape_3.setTransform(35.6962,57.09);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFE800").s().p("AhhGVIgIgDIAGgQIACgDIgBAAIAGgaIAHg1QAHgyATg8QALglAbhHQAQAPAWADQAXACATgMQAQA9AHAfQALA0AEApIAPCKQgnAIgoAAQg/AAhDgUgABwE1QgChMgLgxIgZhmQAXgYAPgmQAKgYAMgvQAEgRABgJQABgPgFgKQgIgTgfgNQgdgMgSAIQgYALgDAqQgDAlALAsQAHAdASAyQgRAMgWgDQgVgDgNgPQARhGgJgqQgHgdgTgVQgUgYgbgFQgQgDgJAGQgPAJACAaQACASAJAVQAGANAOAWIAwBNQAIANgLAbQguBzgFBSIgCA2QgBATgDAPIgBABIgBACIgGAJIgUgHIgagKIgBgBIgYhvIhpjLQg9hNAAhlQAAiDBmhcQBmhcCPAAQCQAABmBcQBmBcAACDQAAA4gTAwIhxEkIgjBcIAjhcIghBhIgBAAIABAAIgGAPIgQAGIAAACIAAABIgBgDIgLADIgjAJgAhuGRIAHgKIgDALIgEgBgADYEfgAAugMQgLgsAEggQADgaAOgHQAMgFASAIQAeALAFATQAEAMgJAZIgSA7QgMAigSATQgQgxgGgYgAhYgwQgTgfAEgSQACgIAEgCQAEgCAGACQAiAJARAfQANAZgBAgQAAATgIAng");
	this.shape_4.setTransform(34.825,42.4846);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,71.7,112);


(lib.lightmoving = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AgUAfQAAgCAFgDIgDgLIgKgUQgGgIAAgKQAAgNALgJQAKgKANAAQAOAAAKAKQALAJAAANQAAAGgCAFIgPAmAAaAfQAFAFgHACQgBAAAAAAQgCABAAAAQgHABgGAAAASAcIAAgCAgUAfQgCAGAEABQAAABABAAQAFABAEAAQgHAHAIAHQAGADAEgDQAGgEgBgKAgQAhQgCAAgCgCAgIAoQAIABAIgBAAUAhQAEgBACgBQABgCgJgD");
	this.shape.setTransform(-27.45,135.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#302B2C").s().p("AgFAGQgIgGAHgHIAPAAQACAJgGAEQgCACgDAAIgFgCg");
	this.shape_1.setTransform(-27.6472,140.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7E7E75").s().p("AgLAHIgJgCIgCAAQgDgCACgEQAAgCAFgDIADABIACAAIAAABIABAAQALADAJgCIAEgBIABAAIACgBIAAgBQAJACgCACQgBACgEAAQAEAAABgCQAGAFgHACIgCAAIgCAAIgNACIgHAAIgIAAgAgTAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAQABAAAAABQAAAAABAAQAAAAABAAQAAAAABAAg");
	this.shape_2.setTransform(-27.126,139.3125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF6B00").s().p("AAJAOIgCgJIgCgJQAAABgBAAQAAAAgBAAQgBABAAAAQgBAAAAgBQgBAAAAAAQAAAAAAAAQgBAAAAAAQgBgBAAAAIgEAJIgCAMIgBAFIgBADIAAACIAAgBIAAgBIAAgDIABgGQAAgIAFgLQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIgFgIIgCgDIgBgEQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAgBIADAAQADABACACIACAFQABAEgCAHQAAABABAAQAAABABAAQAAAAAAAAQAAAAABAAQAAABABAAQAAAAABgBQAAAAABAAQAAAAABgBIgDgIIgBgIQABgEACgBQAAAAABAAQAAAAABAAQABAAAAAAQABAAABAAQAAABABAAQABAAAAABQABAAAAABQAAAAABAAIAAADIAAADIgCAHIgEAGIACAJIABANIABALgAAFgaQgBABAAAAQAAAAgBABQAAAAAAABQAAAAAAABIABAHIACAIIADgFIACgGIAAgEQAAgBAAAAQgBAAAAgBQgBAAAAAAQgBgBAAAAIgCgBIgBAAgAgKgXQgBACACADIAGAKIABgGIgBgGQgCgDgEgBIgBAAIAAABg");
	this.shape_3.setTransform(-27.3562,136.105);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFE800").s().p("AgJApIgBAAIAAgBIgCAAIgDgBIgDgMIgKgUQgGgHAAgKQAAgOALgJQAKgJANAAQAOAAAKAJQALAJAAAOQAAAFgCAFIgOAnIgBABIgCABIgBAAIgDABIgIABQgGAAgHgCgAAMAqIgBgLIgBgNIgDgKIAFgGIABgGIABgDIgBgDQAAAAAAgBQAAAAgBAAQAAgBgBAAQgBAAAAgBQgBAAgBAAQgBAAAAAAQgBgBAAABQgBAAAAAAQgDABAAAEIABAIIACAHQAAABAAAAQgBAAAAAAQgBABAAAAQgBAAAAgBQgBAAAAAAQgBAAAAAAQAAAAAAgBQgBAAAAgBQABgGAAgEIgDgFQgBgCgDgBIgDAAQAAABgBAAQAAAAAAABQAAAAAAABQAAAAAAABIABAEIACADIAEAHQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQgEAMgBAIIAAAGIgBADIAAABIAAABIABgCIAAgDIACgFIACgMIAEgKQAAAAABABQAAAAAAAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAABgBQAAAAABAAQABAAAAgBIACAKIACAJIACAOgAAEgBIAAgHQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAAAgBIADABQABAAABAAQAAABABAAQAAABABAAQAAAAAAABIAAAEIgCAFIgDAFIgDgHgAgIgEQgCgDAAgCIABgBIABAAQADABACADIABAGIgBAFg");
	this.shape_4.setTransform(-27.45,134.7114);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(0.1,1,1).p("AgeAoQAAgDAHgEIgEgOIgPgZQgJgKAAgNQAAgRAPgMQAPgMAVAAQAWAAAPAMQAPAMAAARQAAAHgDAGIgVAxAAbAjIABgCAAmAnQACgCgMgEAAeAqQAHgBABgCQAIAHgJADQgCAAgBAAQgCAAgBAAQgKACgKAAAgeAoQgDAHAFACQABAAACAAQAHACAGAAQgKAIAMAKQAJAEAFgEQAKgFgDgNAgMAzQAMABALgBAgYAqQgEAAgCgC");
	this.shape_5.setTransform(4.075,107.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#302B2C").s().p("AgHAIQgMgJAKgIIAXAAQADAMgKAFQgDACgEAAQgDAAgEgCg");
	this.shape_6.setTransform(3.7823,113.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#7E7E75").s().p("AgRAJIgNgCIgDgBQgFgCADgGQAAgCAHgEIAFABIADABIAAAAIABAAQARAFAOgDIAFgBIACgBIADAAIABgCQAMADgCADQgBACgHAAQAHAAABgCQAIAGgJACIgDAAIgDABQgKACgKAAIgKAAIgNAAgAgdAAQgEAAgCgCQACACAEAAg");
	this.shape_7.setTransform(4.5608,111.4125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF6B00").s().p("AANATQAAgGgDgGIgDgLQgDABgDAAQgCAAgCgCIgGAMQgDAIgBAHIgCAHIAAADIgBACIAAgBIAAAAIABgFIAAgHQABgKAHgOQABgDgBgCIgHgKIgDgFIgBgFQAAgBAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAQABgBAAAAQABAAAAAAQAAAAABAAQAAAAABABQAEAAADADIAEAHQACAFgDAJQACACACAAQADABADgCIgEgKIgBgKQAAgGAEgBQACgCAFACQAFACABACIAAADIAAAEIgDAJIgGAIIADAMQACAGAAAKIABAOgAAHggQgDABAAADQAAAEABAGIAEAKQACgDACgEIADgIQABgEgBgBQAAgCgFgCIgCgBIgCABgAgQgdQgBACADAEIAIANIACgIQAAgEgCgDQgDgEgFgBIgBAAIgBABg");
	this.shape_8.setTransform(4.2107,107.3429);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFE800").s().p("AgOA0IgBAAIABgDIABgDIABgHQABgGADgIIAGgOQACACACAAQAEABADgCIADAMQACAGABAGIACASIgLABQgJAAgLgDgAARA2gAARA2IgBgOQAAgKgBgHIgEgMIAGgJIADgHIABgEIgBgDQgBgDgFgBQgEgCgDABQgDABgBAGIABAKIAEAJQgCACgEAAQgCAAgCgDQACgIAAgFIgEgHQgDgCgFgBQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABQAAAAAAABQAAABAAABIACAFIADAEIAGAJQACACgCADQgGAPgBALIgBAHIgBAEIAAABIAAABIAAgBIgDAAIgFgCIgEgOIgPgaQgJgJAAgNQAAgRAPgMQAPgMAVAAQAWAAAPAMQAPAMAAARQAAAHgDAGIgVAxIgBACIgDABIgCABIgFABgAAHgBQgCgFABgEQAAgEACgBQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAEABABADQABABgCAEIgCAGQgCAFgDACIgDgJgAgMgFQgDgEAAgDIABgBIACAAQAFABADAEQABADAAAFIgBAGg");
	this.shape_9.setTransform(4.075,105.5696);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(0.1,1,1).p("AgnA1QgBgEAKgFIgFgTIgUgiQgMgNAAgRQAAgXAUgPQAUgQAbAAQAcAAAUAQQAUAPAAAXQAAAJgEAIIgcBCAgnA1QgFAJAHADQACAAACAAQAKACAHABQAQABAPgBAggA4QgFgBgCgCAAyA0QAKAJgMAEQgCAAgCAAQgCAAgCAAQgNADgMAAAAnA3QAJAAACgDQACgDgQgFAAjAvIABgDAgQBEQgNALAPAMQAMAGAIgGQANgGgEgR");
	this.shape_10.setTransform(16.9,91.0125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#302B2C").s().p("AgKAKQgQgLANgLQARABAOgBQAEAQgNAGQgEADgFAAQgEAAgGgDg");
	this.shape_11.setTransform(16.5006,99.1125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#7E7E75").s().p("AgXAMIgRgDIgEAAQgGgDAFgIQgBgEAKgFIAFACIAEABIABAAIABAAQAWAGATgDIAHgBIABgCIAEAAIACgDQAQAFgDADQgCADgJAAQAJAAACgDQALAIgNAEIgEAAIgDAAQgNADgNAAIgOAAIgRAAgAgmAAQgGAAgBgCQABACAGAAg");
	this.shape_12.setTransform(17.506,96.625);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF6B00").s().p("AARAZQAAgIgEgIQAAgGgEgJQgDACgFgBQgDAAgDgDIgHARQgEALgCAJIgCAJIAAAEIgBADIAAgBIAAgBIABgGIAAgJQACgOAIgTQACgEgCgDIgIgNIgEgGQgCgDAAgEQgBgEADgCQAAAAABAAQAAAAABAAQABAAAAAAQABAAAAAAQAGABAEADQADAEACAGQACAGgEAMQADAEADAAQAFAAADgCQgEgIgBgGIgCgNQABgIAEgBQAEgCAGACQAGACABAEIABAEIgBAFIgEALQgDAIgEAEIAEAPQACAJAAANIABATgAAJgsQgDACAAAEQgBAGACAHIAEANQAEgDACgGIADgKQACgFgBgCQgBgDgFgCIgEgBIgCAAgAgVgoQgBAEAEAFIAKARIACgKQAAgGgCgEQgEgGgGgBIgCAAIgBABg");
	this.shape_13.setTransform(17.0625,91.2056);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFE800").s().p("AgTBFIgBAAIAAgBIgFgBIgFgCIgGgTIgTgiQgMgNAAgQQAAgYAUgPQAUgQAbAAQAcAAAUAQQAUAPAAAYQAAAIgEAJIgcBBIgCADIgDABIgCABIgHABIgBgSQAAgNgCgJIgEgRQADgEAEgHIAEgKIABgGIgBgEQgBgDgHgCQgFgDgEACQgFACAAAIIACANQAAAEAEAIQgDADgEgBQgDAAgDgDQADgLgBgHQgCgFgDgEQgEgDgGgBQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBABAAAAQgDABABAFQAAADACAEIADAGIAJAMQACADgCAEQgJAUgBANIgBAKIgBAGIAAAAIAAACIABgEIABgEIACgJQACgIAEgLIAHgSQADADADAAQAFAAADgCQADAKABAGQAEAIAAAIIADAXIgPACQgMAAgOgEgAAIgBQgBgIAAgFQAAgFADgBQADgBADACQAGACABADQABABgCAGIgDAJQgDAGgDADIgFgMgAgRgHQgDgGAAgDIABgBIACAAQAHABAEAFQACAEAAAGIgCAJg");
	this.shape_14.setTransform(16.9,88.8645);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(0.1,1,1).p("AgyBFQgCgEANgHIgHgZIgagtQgOgRAAgVQAAggAZgTQAZgVAkAAQAkAAAZAVQAaATAAAgQAAALgFALIgkBWAgpBJQgIAAgBgEQgHAMAIAEQADABADAAQAMACAJABQAWABATgBAAsA+IACgEABABEQANANgQAEQgDAAgCAAQgCABgDAAQgQADgQAAAAxBJQAMgBADgEQADgEgVgGAgWBZQgQAOAUARQAPAHAKgHQARgJgFgW");
	this.shape_15.setTransform(19.175,88.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#302B2C").s().p("AgNANQgUgPAQgOQAWABATgBQAFAVgRAIQgFAEgHAAQgFAAgIgEg");
	this.shape_16.setTransform(18.6589,98.95);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#7E7E75").s().p("AgeAQIgVgEIgGgBQgIgDAHgMQABAEAIAAQgIAAgBgEQgCgEANgHQADACAEAAIAFACIACABIABAAQAbAIAZgFIAJgBIACgCIAFgBIACgEQAVAGgDAEQANAMgQAEIgFAAIgFABQgQAEgQAAIgTAAIgWAAgAApAAQAMAAADgFQgDAFgMAAg");
	this.shape_17.setTransform(19.9581,95.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF6B00").s().p("AAWAgQAAgKgFgKQAAgIgFgMQgEACgHAAQgDAAgEgEIgKAWQgFAPgCALIgCALIgBAGIgBAEIAAgCIAAAAIABgIIABgNQABgRALgZQADgGgDgEIgLgRIgFgHQgCgFAAgEQgCgGAEgCQADgCADACQAIABAFAEQAEAFACAHQADAJgFAPQAEAFADAAQAHABADgEQgFgKgBgHIgCgRQABgLAFgCQAFgCAIADQAIADABAEQACACAAADIgCAIIgFAOQgEAKgFAFIAFAVQADALAAARIABAZgAALg5QgDACAAAGQgCAHADAJIAGARQAEgDADgIIAEgNQADgIgCgBQgBgEgHgDIgFgCIgDABgAgbg0QgCAEAFAIIAOAVQADgIAAgFQAAgIgDgFQgFgHgJgBIgCAAIgBABg");
	this.shape_18.setTransform(19.3795,88.6229);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFE800").s().p("AgYBaIgBAAIgCgBIgFgBQgEgBgDgCIgHgZIgagtQgOgQAAgWQAAgfAZgTQAZgVAkAAQAkAAAZAVQAaATAAAfQAAALgFALIgkBWIgCAEIgFABIgCACIgJABIgBgYQAAgRgDgMIgFgVQAFgGAEgJIAFgOIACgHQAAgDgCgCQgBgFgIgCQgIgEgFADQgFACgBAKIACARQABAGAFALQgDADgHAAQgDAAgEgFQAEgPgCgIQgCgHgEgGQgFgEgIgBQgDgBgDABQgEACACAGQAAAFACAEIAFAIIALAQQADAEgDAFQgLAagBASIgBAMIgBAIIAAABIAAACIABgFIABgFIACgMQACgLAFgOIAKgYQAEAEADAAQAHABAEgDQAFANAAAIQAFALAAAKIAEAeQgJACgKAAQgQAAgRgFgAALgCQgDgKACgHQAAgGADgCQAEgBAEACQAHADABAEQACACgDAHIgEAMQgDAIgEAEIgGgQgAgWgKQgFgHACgFIABgBIACAAQAJABAFAIQADAFAAAIQAAADgDAJg");
	this.shape_19.setTransform(19.175,85.556);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#000000").ss(0.1,1,1).p("AhHBeQgCgGASgKIgKgiIgkg8QgVgYAAgdQAAgqAkgaQAjgdAzAAQAyAAAjAdQAmAaAAAqQAAAPgIAPIgyB1ABZBcQATARgXAGQgDAAgEAAQgDABgDAAQgXAFgXAAAgfB5QgXATAcAWQAWAKANgKQAYgLgHgeAA+BUIADgGABZBcQAEgFgcgJABFBiQAQAAAEgGAhHBeQgJAQALAFQAEABAEAAQARADANACQAfABAagBAg6BjQgLgBgCgE");
	this.shape_20.setTransform(22.2,91.9875);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#302B2C").s().p("AgTASQgcgVAXgTQAfABAbgBQAHAdgYALQgIAFgJAAQgIAAgLgFg");
	this.shape_21.setTransform(21.4854,106.3625);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#7E7E75").s().p("AgqAVIgegFIgIgBQgLgFAJgPQgCgGASgKQAEADAGAAIAHADIACAAIABAAQAnALAjgGIANgCIADgDIAHAAIADgGQAcAJgEAFQATAQgXAGIgHAAIgGABQgXAFgXAAIgbABIgegBgAhFAAQgLgBgCgEQACAEALABgAA6gBQAQAAAEgGQgEAGgQAAg");
	this.shape_22.setTransform(23.3023,101.9625);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FF6B00").s().p("AAfAsQAAgNgHgPQAAgLgHgQQgGADgJAAQgFAAgGgGQgKAUgDALQgHAUgDAPIgEAPQAAAEgBAEIgCAFIAAgCIAAgBQACgEAAgHQAAgKABgGQACgYAQgiQADgIgDgFIgQgXIgHgLQgDgGAAgGQgCgIAFgDQAEgCAFACQAKACAHAFQAGAIADAJQAEAMgHAVQAGAGAFAAQAJABAFgFQgHgOgCgJQgCgNAAgKQAAgPAIgCQAGgEAMAFQAMADABAGQACADAAAEQAAAEgCAGQgEANgDAHQgGANgHAHIAHAdQAEAPAAAXIACAhgAAQhOQgFADAAAIQgCAKADANIAJAXQAGgFAEgLIAGgSQADgKgCgCQgBgFgKgEQgEgDgEAAIgDABgAgnhHQgCAGAHAKIATAeQAFgMAAgGQAAgLgFgHQgHgKgMgBIgDAAIgCABg");
	this.shape_23.setTransform(22.4983,92.3484);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFE800").s().p("AgjB6IgBAAIgCAAIgHgDQgGAAgEgDIgJgiIglg9QgUgXAAgdQAAgqAkgaQAigdAzAAQAyAAAkAdQAkAaABAqQAAAPgIAPIgyB1IgDAGIgHAAIgDADIgMACIgDghQABgXgEgQIgIgdQAIgIAGgMQADgHADgMQADgGAAgEQAAgEgDgDQAAgGgMgEQgMgEgGADQgIADgBAOQAAALACAMQADAJAGAOQgEAFgJgBQgGAAgGgHQAHgUgDgLQgDgKgGgHQgHgGgKgBQgFgCgEACQgFADABAIQAAAGAEAGIAHAKIAPAWQAEAGgEAHQgPAjgCAYQgBAGgBALQABAGgCAFIAAAAIAAADIABgGQACgDAAgEIAEgQQACgPAIgUQADgKAJgVQAGAFAGAAQAJABAGgEQAGASABALQAGAOABAOIAGApQgOACgOAAQgWAAgZgHgAAPgDQgDgNACgJQAAgIAEgDQAGgCAGADQAKAEABAGQACACgDAKIgGARQgEAKgGAFIgJgWgAgfgNQgHgKACgGIABgCIAEAAQAMACAHAKQAFAHgBAKQABAGgFALg");
	this.shape_24.setTransform(22.2,88.1957);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(0.1,1,1).p("AiWC7QgFgMAngTIgVhEIhMh4QgrgwAAg6QAAhUBLg0QBKg5BrAAQBpAABKA5QBOA0AABUQAAAegPAeIhqDqAC8C4QAoAhgxAMQgHAAgHAAQgHACgHAAQgwAJgvAAACCCnIAGgLAhDDwQgwAmA7AtQAvATAdgTQAygXgOg8ACRDEQAigBAJgLQAIgLg8gRAiWC7QgTAfAXALQAJACAIAAQAkAGAaADQBDADA4gDAh7DGQgXgCgEgJ");
	this.shape_25.setTransform(17,83.0375);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#302B2C").s().p("AgpAlQg6gsAwgmQBBADA5gDQAOA7gyAXQgPAJgTAAQgTAAgXgJg");
	this.shape_26.setTransform(15.4813,111.6625);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#7E7E75").s().p("AhZApIg/gJQgHAAgKgCQgXgLATgeQgEgMAngTQAIAFAMABQALAFADAAIAFABIADAAQBQAWBMgNIAbgEQACAAADgFIAPgBIAGgLQA8ARgIALQAoAggxAMIgOAAQgHACgHAAQgwAJgvAAQgdACgdAAIhAgCgAiSAAQgXgCgEgJQAEAJAXACgAB6gCQAigBAJgLQgJALgiABg");
	this.shape_27.setTransform(19.2992,102.9);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FF6B00").s().p("ABBBYQgBgbgNgdQgBgWgOgiQgNAHgTgBQgMAAgNgLQgUApgHAVQgPAogGAdQgDAIgEAXQAAAIgDAHQgDAGAAAGIAAgGIAAgBQADgJAAgNQAAgVADgMQAEgvAhhFQAHgPgHgLIghguQgKgNgFgIQgHgMAAgLQgEgQALgGQAIgEAKAEQAWADAPALQALAPAIASQAHAXgPAqQANANAMAAQATACAKgKQgPgcgEgTQgEgZAAgUQABgdARgFQAMgHAYAJQAaAHACAMQAFAGAAAIQAAAHgFAMQgIAZgHAPQgNAZgOAPIAPA6QAIAfAAAtIAEBCgAAhicQgKAGAAAQQgFASAIAaQAHAQAKAeQAOgKAIgVIAMgkQAHgTgEgEQgDgLgUgIQgJgFgHAAQgFAAgDACgAhSiOQgFAMAPATIAoA7QAJgXAAgNQAAgVgJgOQgPgTgZgDIgHAAQgBAAgBAAQAAABgBAAQAAAAAAABQAAAAAAABg");
	this.shape_28.setTransform(17.5984,83.7719);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFE800").s().p("AhKDzIgCAAIgFgBQgDAAgLgFQgMgBgJgFIgVhDIhMh6QgrgvAAg5QAAhUBLg1QBKg5BrAAQBoAABLA5QBOA1AABUQAAAdgPAeIhqDqIgGALIgPABQgDAFgCAAIgbAEIgFhCQAAgtgHgfIgPg7QAOgPANgZQAHgOAHgZQAGgMAAgHQAAgIgGgGQgBgMgagHQgYgJgNAHQgQAFgCAdQABAUAEAZQAEASAPAcQgKAKgUgCQgMAAgMgNQAPgpgIgXQgHgSgMgPQgOgLgWgDQgLgEgHAEQgMAGAEAQQAAALAIAMQAEAIALANIAhAtQAGALgGAPQghBGgFAvQgDAMAAAVQAAANgCAJIAAABIAAAGQAAgGACgGQADgHAAgIQAFgXADgIQAGgdAPgoQAHgVAUgqQAMALAMAAQAUABANgHQAOAjABAWQANAdABAbIAMBRQgdAFgdAAQgwAAgzgOgAAggHQgIgaAFgSQAAgQAKgGQAKgEAOAHQATAIAEALQAEAEgHATIgMAjQgIAVgOAKQgKgegHgPgAhCgcQgPgTAFgMQAAgBAAAAQAAgBAAAAQABgBAAAAQABAAAAAAIAIAAQAZADAOATQAKAOAAAVQAAAMgKAXg");
	this.shape_29.setTransform(17,75.4914);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#000000").ss(0.1,1,1).p("ADPD4IAKgQAjvEWQgIgSA+gcIghhlIh6i0QhEhHAAhWQAAh9B4hOQB1hVCqAAQCnAAB3BVQB8BOAAB9QAAAsgYAtIioFdAErERQANgQhfgZAErERQA/AyhNASQgLAAgMAAQgKADgMAAQhNAOhLAAAhqFmQhNA4BdBDQBKAcAwgcQBPgigXhZAhqFmQBpAEBZgEADmEjQA3gBAOgRAjvEWQgfAvAlAQQAPADAMAAQA6AJAqAFAjEEmQglgDgGgN");
	this.shape_30.setTransform(16.775,70.3875);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#302B2C").s().p("AhCA3QhdhCBNg5QBoAEBagEQAXBYhPAjQgYAOgfAAQgeAAglgOg");
	this.shape_31.setTransform(14.3567,113.0125);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#7E7E75").s().p("AiPA+QgpgEg7gKQgLAAgQgDQgkgQAeguQgHgRA+gdQAOAHASACQASAIAFAAIAHABIAFAAQCAAgB5gTIAsgFQADAAAFgIQAMAAALgBIAKgRQBgAZgOARQBAAwhOASIgXAAQgKADgLAAQhNAOhLAAQgtACgwAAQgxAAg1gCgAjpAAQglgDgGgOQAGAOAlADgADCgDQA2gCAOgQQgOAQg2ACg");
	this.shape_32.setTransform(20.4357,99.95);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FF6B00").s().p("ABoCDQgCgpgWgrQgBgggWgzQgUALgfgCQgUAAgUgQQggA9gLAfQgYA7gJAsQgGAMgGAiQAAAMgFALQgFAHAAAJIAAgHIAAgCQAFgNAAgUQAAgfAFgSQAGhGA1hnQALgWgLgRIg1hEQgQgTgHgMQgMgSAAgRQgGgYASgJQAMgGARAGQAjAEAXARQASAWAMAcQAMAigYA+QAUAUAUAAQAfADAPgPQgXgqgHgcQgHglAAgfQACgrAbgHQAUgLAmANQApALADASQAIAJAAAMQAAALgIASQgMAlgMAWQgUAlgXAXIAZBWQALAuAABEIAHBigAA0jpQgPAJAAAYQgIAbAMAnQALAYAQAsQAXgOANggQALglAHgQQAMgdgHgGQgFgRgfgMQgPgGgLAAQgHAAgGACgAiEjUQgHASAXAdIBABXQAPgiAAgTQAAgfgPgVQgXgdgpgFIgLAAQgFACAAADg");
	this.shape_33.setTransform(17.725,71.4654);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFE800").s().p("Ah2FqIgEAAIgIgBQgEAAgTgIQgSgBgOgIIghhkIh6i1QhEhHAAhVQAAh9B4hOQB1hVCqAAQCnAAB3BVQB8BOAAB9QAAAsgYAsIioFdIgKARQgMABgMAAQgFAIgDAAIgsAFQgtAHgvAAQhMAAhRgUgABaCrQAVArACAoIASB5IgGhiQAAhEgMguIgZhXQAXgWAUglQAMgWAMglQAIgSAAgLQAAgMgIgJQgDgSgpgKQgmgNgUAKQgbAHgBAsQAAAeAHAlQAGAcAXApQgPAPgfgDQgUAAgTgTQAXg+gMgiQgLgbgTgXQgXgQgjgFQgRgGgMAGQgSAJAGAYQAAARAMASQAIAMAQATIA0BEQALAQgLAXQg0BngHBHQgFASAAAfQAAATgEAOIAAABIAAAHQAAgIAEgIQAFgKAAgMQAHgiAFgMQAKgsAYg8QALgfAgg+QATARAUAAQAfABAVgKQAVAzACAhgAAygLQgMgmAIgcQAAgYAPgJQARgGAWALQAfAMAGAQQAGAGgMAdQgGARgMAkQgNAfgWAPQgRgtgLgXgAhqgqQgYgdAIgSQAAgDAEgBIAMAAQAoAEAXAdQAPAVAAAfQAAATgPAig");
	this.shape_34.setTransform(16.775,59.1406);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#000000").ss(0.1,1,1).p("AlOGpQgLgbBXgrIguiaIirkUQhfhuAAiDQAAi/Cnh4QCkiCDuAAQDpAACmCCQCtB4AAC/QAABEghBEIjrIXAkSHCQg0gEgIgVQgrBIAzAZQAWAFAQAAQBRAOA6AHQCUAGB8gGAEhF8IAOgZAFBG+QBNgCATgaQBZBNhsAbQgQAAgRAAQgNAFgRAAQhrAVhpAAAiVIkQhrBWCCBnQBoAqBCgqQBvg1ggiIAGhGiQATgYiFgn");
	this.shape_35.setTransform(39.225,39.075);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#302B2C").s().p("AhcBUQiChmBrhWQCTAGB9gGQAgCIhvA0QgiAVgqAAQgqAAg0gVg");
	this.shape_36.setTransform(35.8426,104.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#7E7E75").s().p("AjIBfQg6gHhRgOQgQABgWgGQgzgYArhHQAIAUA0AEQg0gEgIgUQgLgbBXgsQATAMAZACQAaAMAGAAIALACIAGAAQC0AyCogfIA+gIQAEAAAHgLQARAAAQgCIAOgaQCFAngTAZQgTAZhNACQBNgCATgZQBZBLhsAbIghAAQgNAGgRgBQhrAVhpAAQg/ADhDAAQhEAAhKgDg");
	this.shape_37.setTransform(44.3344,84.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FF6B00").s().p("ACRDIQgDg+gehBQgCgygehOQgcAQgsgCQgcAAgbgaQgtBegPAwQgiBbgNBDQgIATgJA0QAAASgHAQQgGALAAANIAAgKIAAgCQAGgVAAgeQAAgvAHgcQAJhsBKidQAPgjgPgZIhKhpQgWgdgLgSQgQgcAAgaQgJglAZgNQARgKAYAKQAxAGAgAaQAaAiAQAqQARA0ghBgQAbAeAcAAQAsAEAVgWQghhAgJgsQgJg4AAgvQAChDAlgKQAcgQA1ATQA6ARAEAbQALAOAAASQAAARgLAcQgRA4gRAjQgcA4ggAjIAjCEQAQBHAABoIAJCWgABJllQgVANAAAlQgMAqARA7QAQAlAXBEQAfgWASgwQAQg5AJgZQARgtgJgJQgIgZgrgTQgUgKgQAAQgKAAgIAEgAi4lFQgLAbAhAtIBZCGQAVg0AAgeQAAgwgVggQgggsg5gHIgQAAQgGACAAAFg");
	this.shape_38.setTransform(40.5422,40.7394);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFE800").s().p("AilIqIgGAAIgLgCQgGAAgagLQgZgDgTgLIguiaIirkVQhfhtAAiDQAAi/Cnh4QCkiCDuAAQDpAACmCCQCtB4AAC/QAABEghBEIjrIXIgOAZQgQACgRAAQgHAMgEAAIg+AIIgJiWQAAhogQhGIgjiGQAggiAcg5QARghARg5QALgbAAgRQAAgTgLgNQgEgcg6gQQg1gUgcAQQglALgCBCQAAAvAJA5QAJAqAhBAQgVAXgsgFQgcAAgbgdQAhhfgRg0QgQgqgagjQgggZgxgHQgYgJgRAJQgZAOAJAlQAAAaAQAbQALATAWAdIBKBoQAPAZgPAiQhKCfgJBsQgHAbAAAwQAAAegGAUIAAADIAAAKQAAgNAGgLQAHgQAAgTQAJg0AIgSQANhDAihcQAPgvAthfQAbAZAcAAQAsADAcgRQAeBPACAyQAeBCADA+IAZC5Qg/AMhBAAQhsAAhwgggAC3I+gABGgRQgRg7AMgqQAAglAVgOQAXgJAfAQQArASAIAaQAJAJgRAsQgJAZgQA4QgSAwgfAXQgXhFgQgjgAiVhBQghgsALgcQAAgEAGgDIAQAAQA5AHAgAtQAVAgAAAvQAAAdgVA0g");
	this.shape_39.setTransform(39.225,21.8625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},3).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},3).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},3).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20}]},3).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25}]},2).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30}]},2).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35}]},2).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35}]},62).to({state:[]},1).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.9,-37.7,129.3,180.3);


(lib.keshet = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EDBAA0").s().p("AgBEwQgugTAEg7QAEgoAagrQgtANghgNQgugTAEg7QAEgsAggwQgTANgVAJQhFAggugTQgugSAEg6QAGg7A1hBQAigpAogcQAXgQAagLQAXgMAVgFQApgKAeANQAuASgFA7QgEAtgfAvQASgMAVgJQAXgLAWgFQApgKAeAMQAuATgFA7QgEAogZAqIAHgBQApgKAeAMQAuASgFA7QgFA2gtA7IgIAKIgWAYQgXAYgaATQgTAMgTALIgPAHQgsAUgiAAQgUAAgQgGg");
	this.shape.setTransform(72.2345,273.7369);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#744516").s().p("AWFXVQhOgYg8g4QgKgTAAgfQABgcAAgRIAKAHQA2AeBCgGQBBgHAygnQAwgmAYg9QAXg8gHg/QgHhFgqg6Qgrg7g+gdQgxgXhBgGQgrgFhOACQg5ABgiAGQgyAIgiAXQgbATghArQgqA2gNAOQgQAPgiAaQgjAbgPAOQgYAYgeAuQgmA4gOARQhFBVhoAjQg+AVh6AHQh7AIgwAQQgxARg6AJQg6AKggAGQgyALg/ADQgnADhMABQi+ADhsgFQhqgEhLgPQhigUhHgpQgXgNgVgQIAWgZIAIgJQAtg8AEg2QAGg7gugSQgfgNgpAKIgHACQAagrADgoQAGg7gugSQgfgNgpAKQgVAGgYALQgUAJgTAMQAfgwAEgsQAGg7gugTQgfgMgpAKIgEgPQgdhpgLgzQgRhYAChHQABg/ARhMQAKgvAbhZQAbhbAPgrQAZhJAdg2QAVgoAlg4IA+hdQBUiGA2iUQA2iVAUicQAbjTg9iFQgXgxg7hQQgYgigOgQQgYgagYgNQgkgVg8gGQiFgMh6A4Qh+A6hCBuQgtBMAaAzQAiBBCIgOQAPgBANgDIABAGQAFAbgBANQgBAtgkArQgXAegzAnQgYATgPAHQgXAMgUAAQgagBgngaQiKhdgThpQgMhBAfhLQAXg2A0hJQAkgwAZgdQAjgoAjgbQBfhICKgPQB3gNCKAeQCxAmBuBVQBAAzAoBDQArBIAFBMQADApgIAyQgFAggNA6QghCLgSBBQggBxglBWIg5B5QgiBJgQAzQgWBHgRCDQggEJgPEFQgEA5ABAiQABAyAJAnQAKAwAcA3QARAhAnBAQBlCkBDBQQBrB9B4A1QBzAzCogBQDbgDCthPQBtgyCbh3QDDiXA6glQCPhaCkgwQCjgwCpgCQBRgBA4APQBKASAsAsQAxAxAXBfQANA3ASBxQAHAhASBCQANA6gDArQgFBPg6BAQg5A/hPATQghAIgiAAQgtAAgvgOg");
	this.shape_1.setTransform(186.9876,160.6719);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AUsYhQhXgpgwhPQg0hVAdhQQAMggAUgHQALgEAKADQABgMAFgMQAKgVAUgFQAVgFAbAPIAuAbQAsATAugdQAugcAKgxQAJgugXgvQgWgtgqgcQhHgvh0ABQhQAAgvAbQggASgkAqIg7BHQgSATgoAiQgoAigSATQgUAWgmA2QgjAzgYAXQhZBaixAbIiQAXIiSAXQgmAGhBAOQhBAPgmAGQgoAHgzACQgiABg6AAIjZgBQi7gBhigPQidgXhqhEQgcgSgagWQAUgKATgNQAagSAXgYQAVAQAXANQBHApBiAUQBLAPBqAEQBsAFC+gDQBMgBAngDQA/gDAygLQAggGA6gKQA6gJAxgRQAwgQB7gIQB6gHA+gVQBogjBFhVQAOgRAmg4QAeguAYgYQAPgOAjgbQAigaAQgPQANgOAqg2QAhgrAbgTQAigXAygIQAigGA5gBQBOgCArAFQBBAGAxAXQA+AdArA7QAqA6AHBFQAHA/gXA8QgYA9gwAmQgyAnhBAHQhCAGg2geIgKgHQAAARgBAcQAAAfAKATQA8A4BOAYQBSAZBNgTQBPgTA5g/QA6hAAFhPQADgrgNg6QgShCgHghQgShxgNg3QgXhfgxgxQgsgshKgSQg4gPhRABQipACijAwQikAwiPBaQg6AljDCXQibB3htAyQitBPjbADQioABhzgzQh4g1hrh9QhDhQhlikQgnhAgRghQgcg3gKgwQgJgngBgyQgBgiAEg5QAPkFAgkJQARiDAWhHQAQgzAihJIA5h5QAlhWAghxQAShBAhiLQANg6AFggQAIgygDgpQgFhMgrhIQgohDhAgzQhuhVixgmQiKgeh3ANQiKAPhfBIQgjAbgjAoQgZAdgkAwQg0BJgXA2QgfBLAMBBQATBpCKBdQAnAaAaABQAUAAAXgMQAPgHAYgTQAzgnAXgeQAkgrABgtQABgNgFgbIgBgGQgNADgPABQiIAOgihBQgagzAthMQBChuB+g6QB6g4CFAMQA8AGAkAVQAYANAYAaQAOAQAYAiQA7BQAXAxQA9CFgbDTQgUCcg2CVQg2CUhUCGIg+BdQglA4gVAoQgdA2gZBJQgPArgbBbQgbBZgKAvQgRBMgBA/QgCBHARBYQALAzAdBpIAEAPQgVAFgYALQgZAMgXAPIgIgaQgehmgLg1QgThXgBhIQgChMAThbQAMg+AehlQAliAAghQQArhwA2hUIBBhcQAog4AVgmQAWgoATg2QAMgiAUhAQA5i5AKhwQAQiohCh0QgvhThIgjQhAgehPALQhJAJhDApQhaA4gcBNQARAGAbgDIAtgFQAYgBAVAJIAAABQAEgCAFAAQAUAAAQAUQANARAFAZQAUBigzBjQgxBfhcA4Qg8AlgyAAQgigBglgRQgcgNgkgaQiZhwgfiBQgZhmAwh1QAlhcBThrQA2hFAugmQBlhTCkgYQDQgeDcBIQDkBKBkCSIACgJIAAAMIAHAKQAhAzASA9IAmAwQBrCDBKCZQBKCaAjClIAZCCQAQBMAVAzQAoBfBTBQQBJBIBnA0QBWAsByAiQBLAXCHAfQBCAQAiAKQA3ARAoAWQArAZBLBCQBLBCAqAZQBAAkCpAmQCaAjBGA0IBHA6QB4AXBDBHQA2A5AdBmQARA8AYB7IAcB1QAPBEgCAzQgDBcg0BSQg1BQhSAsQhRArhhABIgCAAQheAAhTgngAoIxYQALBrgaB3QgUBbgvB8IhTDSQirHGADHlQABBoAQA6QAMAsAbAyQASAfAkA4QBaCLA8BEQBfBpBoApQBbAjB/gBQCCAAB2ghQB+gjBlhFQAmgaAzgqIBWhKQDDigDkhaQDuheDxgDQBFgBA6AKIgqgcQhdg6hTgaQgRgGiDgeQhagVgzgdQgmgWg1gvQhBg7gWgQQhTg9iMgnQijgnhQgXQixgziEhhQiUhug8iXQgUg0gRhOQgRhZgKgtQgjifhKiVQhJiUhqh9IgOgRQAIAiADAmg");
	this.shape_2.setTransform(187.1652,160.782);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.keshet, new cjs.Rectangle(0,0,374.3,321.6), null);


(lib.girlshoot = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AJUm7IgBBZAI2mxQADANAFANQAAABABACAMprXIhMC5AN+HFIgBgDIg+jNAmbI8IAAAAAsYGyIAAAFQhoB8ADCiIGIADIBaicArrHGIFQB2");
	this.shape.setTransform(84.1687,371.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(3,1,1).p("AGbyTIAWgIAvuSQIAAs8QkVthCnv2QAvkGEvi8QOHo3M6NFQFuI0iIMwQhgNZB/LbAF/0TIAcCAQEPAtABSsQg+Btg9BeQDWC9g9GrAuKwPQgJD0A7CSQhGQIKKG+AAix+QAiAvA3AiIEghmAm7yZIAHgCAm7yZQAbBcBGBCIF8iDAnI1jQgOBxAbBZAgQ2fQgdC0BPBtAsI7pQjUFtBSFtIHPiKADLK7QABACABACQj/DZjihbAAKREQAJAbALAXQBaC6DVhtQDEhFgai1QHxA9DgDbAABQnQAPgEAPgGQBSgdA3hGQAngzAZhGQAGgRAFgRAlwP+QBIgzAUiOAncQZQBAADAsgeQDfBOCSglEAMjAirInCigIgYhtQiLAlhrhkIAABFQhaBVhbhVQgqgjCFgiQhfgaAThxIiBhMQgehFB5AAQCYAmgfBOQCvhKBbBhAncQZQgzDbC/BRQEhARAwkvArgKdIAAEOAosLtQhpgHhBjLAvuSQQDWiTE8AcAL7CzQgWFXDUC7ADNK/QANAhAaAhQBMBkC3BkAFIebIg3j4QBjAGBbANQDuAgC6BLQBlApBVA1QiCgRg4hNAIwERQi4EcirCSEAMjAirIISAAIAejSQCEnwkPkIEgIEAirIi0gKIAAnCQjaATg+EjIlOh1IgCAAIgCgBIgBAAIgqgPIAAAAIgwgRIgBAAQBmoiEqjNA0eegIgFgBEgIEAirIhkAAEAMjAirI0nAAANLaFQAABgAsA8");
	this.shape_1.setTransform(140.6505,221.901);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#079BF4").s().p("AMjJxInCigIgYhtIAYBtIHCCgI0nAAIi0gKIAAnCQjaATg+EjIlOh1IgFgBIgqgPIAAAAIAAgEIAAAEIgwgRIgBAAQBmohEqjNQDWiTE8AcQgzDbC/BRQEhARAwkvIAIAaIABADQAJAbALAXQBaC7DVhuQDEhFgai1QHyA+DfDaQEPEJiEHuIgeDSgAjUBPICBBLQgTBxBfAaQiFAjAqAiQBbBWBahWIAAhFQBrBlCLgmIgBgDIg3j4QBjAGBbANQDuAgC6BLQA4BOCCAQQhVg1hlgpQgsg8AAhgQAABgAsA8Qi6hLjuggQhbgNhjgGIA3D4Ig+jNQhbhhivBKQAfhOiYgmQh5AAAeBGgA0gFmIgCgBIgBAAIAFABgA0jFlg");
	this.shape_2.setTransform(140.6505,381.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0767AC").s().p("AlZEhQi/hRAzjaQBAAEAsgfQDfBNCTglQgvEfkFAAIgegBgAAVBTQgLgXgJgcIgBgCIgHgbQAOgDAPgFIgBBYIABhYQBSgeA3hGQAngyAZhHIALgiIgLAiQgZBHgnAyIBMi4QBMBjC3BkQAaC0jEBFQhPApg+AAQhqAAg4h1gAAWgFg");
	this.shape_3.setTransform(141.5701,327.8702);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FAB7AE").s().p("AwuajQgDiiBoh9IAAAAIAqAPIABAAIACABIFQB1IhaCcgAEhWZQgqgjCFgjQhfgaAThxIiBhLQgehGB5AAQCZAmgfBOQCvhKBbBhIA+DNIABADQiLAmhrhlIAABGQgtAqguAAQgtAAgugqgAATHyQBIgyAUiPQqJm8BGwKQg7iRAJj1IHPiJQAbBbBFBCIF9iCQAiAvA3AhIEghmQEPAuABSsQg+Btg9BeQi4EcirCRIgCgEIACAEIgDACQiyCXikAAIgBAAIAAAAQhDAAhBgZIgCgBIAAAAIgCgBIACABIAAAAIACABQBBAZBDAAIAAAAIABAAQCkAACyiXIADgCQANAhAaAiIhMC4Qg3BGhSAeQgPAFgPAEQgvAMg3AAQh1AAiXg1g");
	this.shape_4.setTransform(101.8687,274.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FEA112").s().p("AHeWuQi3hkhMhkQgaghgNghQCriSC4kcQCmCTAAEjQAABTgNBfQANhfAAhTQAAkjimiTQA9heA+htQgByskPgtIkgBmQg3gigigvQg6hQAAh2QAAgrAIgwQgIAwAAArQAAB2A6BQIl8CDQhGhCgbhcIAHgCIgHACQgSg7AAhGQAAgjAFgmQgFAmAAAjQAABGASA7InPCKQgXhnAAhmQAAkHCZkGQiZEGAAEHQAABmAXBnQgJD0A7CSQhGQIKKG+QgUCOhIAzQgsAehAgDQk8gcjWCTIAAs8QkVthCnv2QAvkGEvi8QOHo3M6NFQFuI0iIMvQhgNaB/LbQjgjbnxg9gAr5WQIAAkOgApFTSQhpgHhBjLQBBDLBpAHgAOgSqQjAipAAkqQAAgfACggQgCAgAAAfQAAEqDACpgAGCquIAWgIIgWAIIgciAIAcCAgAAJqZIAAAAgAnUq0IAAAAg");
	this.shape_5.setTransform(143.1766,173.401);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.2,-1.5,289,446.9);


(lib.girlpointdone = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("EAk+gPsQBKAxALA4QADAQgCAQQgKBZhsBoAcvvuIgkBEQhyGHCsDFAc+vBQgIgXgHgWQhFjjBUjiQBZhkBHBkQAdCRgTCSIA6gvQBVhGBEAOQAiAoAOApQALAgALAzIg0BxEAjrgSmIAyAAQCeAUh9CmAfoyQQgEAcgGAcEAkGgOXIA4hVAdktRQA5izDAAFQBHATgBA5IgyA1QAVClBkhuAf/jgQDygDgRmIQAjgcAbgbAYmCLID8oBIAjAYQBGBPB0AvAYmCLIgsg7IlVPKQgIgHgIgHQklkmm3hMAevKXIAFAGAevKXIAcgrIgXAxIAlAxQhPNOm5GJQopCemNq2QDtLah0JAAfLJsIA0tMAYmCLIGJIMEAjugMGQgoBXBYANEAhxgN+IiOCZAoX/2QA4CSAAB3QABB5g5BdImwASQAglzlDjmQjAFzAOFzIl4AAQA6YHKEEHQACgHABgHAhB4FIllAAQAuh0hnh0AB63WQgCBIgEBGQg+UtnGFZAhB4FIC1C9Ai7+1QDaDqhgDGEgY9gmUQCwlfKMBiQR0CHBGRtMAAAAg3EgXCgmwQhAALg7ARQpNCogBLVMAA3AuxQEFocG8iIIBdgfQClgBA7lAQCeBADmgfQC0gNCOhsA7b5ZQhqBRAxCQAmTEhQABAPACAOQAbDABvBqA02LXQAcHQKAhMQG+g7gqm4QGPgfEwBREgXrAqnQhQnWDOodQlqG5AVI6EgmUAqnQBWspDqnkA02LXQmXEZEoFfQFEGAFpoNQD2GcGIkiQGGlYoSl8");
	this.shape.setTransform(245.315,272.7055);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0767AC").s().p("AqpEjQkoleGXkaQAcHPJ/hLQG+g6gqm5QITF8mHFYQmIEhj2mbQjPEvjFAAQiPAAiJiig");
	this.shape_1.setTransform(168.9341,379.5737);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FEA112").s().p("A0iuRQACrUJNioQCwlfKLBiQR1CGBGRtMAAAAg4QkwhSmRAfQhuhqgbi/QHGlaA/0tQADhFAChJQgCBJgDBFIi3i8QAeg9AAhAQABiRiYiiQCYCigBCRQAABAgeA9IlkAAQAuh0hnh0QABB5g5BcImvATQAflzlCjmQjAFzAOFzIl4gBQgQgtAAgnQAAhVBIg4QhIA4AABVQAAAnAQAtQA6YHKEEHQg7FAilABIhdAgQm8CIkFIbgAGKxmQAAh3g4iTQA4CTAAB3gArT8NQA6gRBBgLQhBALg6ARg");
	this.shape_2.setTransform(157.95,208.0555);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#079BF4").s().p("A0NUrQhQnVDOodQlqG5AVI5IrSAAQBWspDqnkQEFoaG8iIIBegfQmYEZEoFfQFFF/FpoMQD1GaGHkgQGIlYoTl9QGPgfEwBSQG3BMElElIAQAPIFVvKIAtA6IGJINIAEAGIAlAxQhPNNm4GIQoqCfmNq2QDuLah1I/g");
	this.shape_3.setTransform(223.1,413.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FBB398").s().p("A52TTQClgBA7lAIACABIADABIAAAAQBoAqCHAAIAAAAIABAAQBAAABHgKIABAAIAHgBQC0gMCOhsQAbC/BvBqQAqG5m+A7QhaAKhOAAQncAAgYmPgATmKHID8oCIAjAYQBGBPB0AvIg0NNIgcArgAyiO+QiHAAhogqIAAAAIgDgBIgCgBIADgNIgDANQqEkHg64HIF4ABQgOlzDAlzQFDDmggFzIGwgTQA5hcgBh5QBnB0guB0IFlAAIC2C8Qg+UtnHFaIgDgeIADAeQiOBsi0AMIgHABIgBAAQhHAKhAAAIgBAAIAAAAgA2WOSIAAAAgAYFCdQisjDBymIIAkhEQhFjiBUjjQBZhkBHBkQAdCSgTCSIgKA4IAKg4IA6gwQBVhFBEANQAiApAOAoQALAgALAzIg0BxIA0hxQgLgzgLggIAyAAQCeAUh9CnIg4BUIA4hUQBKAwALA5QADAPgCAQQgKBZhsBpQg9gKAAgrQAAgUANgbQgNAbAAAUQAAArA9AKQgbAbgjAcQARGHjyACQh0gvhGhPgAajjoICOiZgAdnkeQAbgBAngrIABgBIgBABQgnArgbABIgBAAIAAAAQgogBgMhdIgBgFIAyg2IAAgCQAAg3hGgSIgMAAIAAAAIAAAAQixAAg5CkIgDAKIADgKQA5ikCxAAIAAAAIAAAAIAMAAQBGASAAA3IAAACIgyA2IABAFQAMBdAoABIAAAAIABAAgAX+nFQgIgWgHgXQAHAXAIAWgAfeilIAAAAg");
	this.shape_4.setTransform(277.34,221.8783);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.girlpointdone, new cjs.Rectangle(-1.5,-1.5,493.7,548.4), null);


(lib.girl1look = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("ALZFpQNXELHlwaIj6i1IAAnHQgeDajQgvIkRjkQDOibg6jyInpD6IkFi2QprOaFlJDQBmCmC3CKQhxCrDACqQDDDOBkDVIEzmMQNgnhCquIQCAtjq4l0QurompnQfQpnQgl6EqQF1glEhAeQAPBnAOA5QDBBdC6jFIAtAwABKEsQAAABABABQBkEaCnBkQCdBeDcgyQArgKAugQAAUBxQmFCyBuGQQEsFzEtl6QjWHAGXBdQGUgDjcnuAAUBxIA2C7AAUBxQAYBmAeBVA7/VnIB7DwQEfqvJBhtQo4J8giJPIe4AAEgilAgoIBmAAICfgiIAAlJIChlWAI6aaQB4C2h4C2IIWAAQDQnkjRnBA97R3IB8DwAnPWKQhVD3E4BHEgilAgoIj6AAIAAhEQAPltECgsIETnUIiLkOQI1s9MyhUEgilAgoIAAh9");
	this.shape.setTransform(203.2693,476.2526);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0767AC").s().p("ABVAPQCdBeDcgyQDdHumUADQmWhdDUnAgAoDAWQhumPGGiyQAYBmAeBVIABACQBkEaClBjQiWC/iYAAQiVAAiVi4g");
	this.shape_1.setTransform(228.9001,543.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#079BF4").s().p("APiQiQA7hbAAhbQAAhbg7hbQA7BbAABbQAABbg7BbI+4AAQAipPI4p7QpBBskfKuIh7jvIh8jwIiLkOQI1s8MyhWQF0glEhAfQAQBnAOA6QmGCyBuGPQEtFyEtl5QjWG/GXBdQGUgCjdntQAsgKAugQQDDDNBkDVQDRHAjQHlgAC7LkQj1g4AAikQAAgtATg2QgTA2AAAtQAACkD1A4g");
	this.shape_2.setTransform(160.8941,575.9083);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FBB398").s().p("A/gcJIAAh9IAAB9Ij6AAIAAhEQAQluEBgrIETnVIB8DwIigFWIAAFKIifAigAIbGMQimhkhlkZIgBgDIg2i5QDCBcC6jEIAsAvQllpEJruaIEGC2IHoj6QA6DyjNCcIEQDjQDQAvAfjZIAAHGID6C2QnlQZtYkKQi2iJhninQBnCnC2CJQhwCqDACrQguAPgsAKQhMAShFAAQiBAAhng+gAOeBKIAAAAg");
	this.shape_3.setTransform(183.525,505.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FEA112").s().p("AhXSiQjAiqBxirQNWEKHlwaIj6i0IAAnHQgeDajQgvIkRjkQDOibg6jyInpD6IkEi2QprOaFlJDIgtgwQi6DFjBhdQgOg5gQhoQkhgfl1AmQF6kqJowfQJmwfOrImQK4FziANkQiqOHtgHiIkzGMQhkjWjCjNgAtrJVIA2C7QgehVgYhmg");
	this.shape_4.setTransform(292.8693,427.8901);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.girl1look, new cjs.Rectangle(-44.6,265.9,495.8,420.70000000000005), null);


(lib.faceidea = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("ADDt5IAABuQHHAIEJkCIAAjcQjxFTnfAVgAJYp9QACAAADAAQA/gFA9gLQACAAABAAQAEgBAFgBQAZgFAagGQAFgCAFgBIAiA2QAUAvAAA5QAABcgyBAQgyBBhGAAQhGAAgyhBQgxhAAAhcQAAg5ATgvgAMiqdQC1gvCYhxQC6EEk8GLQjxhEkTBEQguADgngDQlPgZCSnWQDNArC0gLAN8E1QBLA+CKg9AMvCWQAVBxA4AuAJnA8QGmmtDQGtAzcszQG9D9G9ijIgKCCQmlCHnLiHgAqol7IA6gJQAfAoAPA3QAYBZggBLQgfBLhDASQhEAShBgxQhAgygYhYQgPg3AHgzIAhgyQAgAAAggCQAFgBAFAAQABAAAAAAQAEAAADAAQAZgDAagCQAAgBABAAQADAAADAAQABgBABAAQACAAADAAQAZgEAagEQDBgiCthgQCIDSiHEgQlpgBlpC1Qj7hyA0nGQC5ApCrgDArplxIAHgBAyMDwQBBgmBAghAjCDwQCPElDYklABfTiQCWigCWAyAkmLGQIXKmKLw3");
	this.shape.setTransform(124.45,124.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ay+hFQC5ApCrgCIghAwQgHAzAPA3QAYBYBAAyQBBAxBEgRQBDgTAfhLQAghLgYhZQgPg2gfgoIg6AJQDBgiCthgQCIDRiHEgQlpgBlpC3Qj7hzA0nGgAGoCbQlQgYCTnWQDNAsC0gLIhAAVQgTAvAAA5QAABcAxBAQAyBABGAAQBGAAAxhAQAyhAAAhcQAAg5gTgvIgig2QC1gvCXhwQC7EEk9GJQjxhDkTBDQgYACgXAAIglgCgArUgnIAGgBIgHABIABAAg");
	this.shape_1.setTransform(122.4534,91.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6B3F1B").s().p("AsSEbQhAgygXhYQgPg3AHgzIAggxQAhAAAggCIAKgBIABAAIAHAAIAygFIAHgBIACgBIAFAAIAzgIIA7gJQAfAnAPA3QAXBZggBLQgeBLhEASQgSAFgSAAQgxAAgwgkgAJUgEQgxhAAAhcQAAg5ATgvIA/gWIAFAAQA/gFA9gLIAEAAIAIgCIA0gLIAJgDIAiA2QAUAvAAA5QAABcgyBAQgxBAhGAAQhHAAgxhAg");
	this.shape_2.setTransform(121.5386,89.89);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Aw3EjIAAjcQG9D9G9ijIgKCCQjSBEjcAAQjcAAjmhEgAFoBvIAAhuQHfgUDxlTIAADcQkCD5m0AAIgaAAg");
	this.shape_3.setTransform(107.95,35.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.faceidea, new cjs.Rectangle(-1.5,-1.5,251.9,253), null);


(lib.angryface = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("ALoFaIBKApALtGcIBGgYAFVlYIB4iWQjckhmZj7gAjbt6IAFAFAkTvEIADAEAsynuIALBWAGLQLIgNh+");
	this.shape.setTransform(87.875,103.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(5,1,1).p("AHsASQADgBACgBQABAAABAAIABgBASmIrIqqoeIgIACQADgBAEgCAGxgcIA7AuAA8JNQAFgcAGgbQBel/EShyQAagLAbgIAHSOzQg3pnKaCXIBxBIAsPlNQB/B0CTBEQFAghCgmrIiPi8Aoz0cIAhArApH03IACACQAJAMAJANQAHgBAHAAAph1ZIAXAeAxptlQDWmtFggKAyluhQAiBMAlBGQCSEWC9CsQg3pnKaCXAoNzsIFhHPAp1EOQF/DTBNmRAyRMpIQ4IxQAWmAmRj1QlajUljEYgALHRCQgBAAgBAAQgugUgvgTQgFgCgGgDQgogRgogQQBeAxBhAeQABABACABQA+ASBAALQA+gXAzgmQDEiSAklpALHRCIAFACALHRCICGAhAgNIiQAwA8AyA2QDWDqDiB3");
	this.shape_1.setTransform(118.95,141);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6B3F1B").s().p("AH+OuIgCAAIhcgnIgMgFIhQghIg7hCQg3pnKaCXIBxBIQgkFpjECSQgzAmg+AXgAvYnhQg3pnKaCXICQC8QihGsk/AgQiThDiAh1g");
	this.shape_2.setTransform(139.0152,155.7617);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("ADeFtQG0CkDID8Ig6CMgAtZuYQGbD7DbEhIh4CWg");
	this.shape_3.setTransform(156.725,92.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AybMLQFkkYFZDTQGSD2gXF/gABLJ2IgOh+QBfmAERhxIBFgYIKpIeIhwhIQqaiXA3JnIA7BBQjjh3jVjpgAxostIgKhWQDVmtFhgKIAgArIAFAFIFhHPQqaiXA3JnQi8isiTkWg");
	this.shape_4.setTransform(119.95,144.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.angryface, new cjs.Rectangle(-2.5,-1,245,281.5), null);


(lib.bubble = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF99CC").s().p("AqnMzIgKgEIAyAAQgNAGgMAAQgIAAgHgCgAwsMCQgIgEgGgHQgIgLgDgNIAAgEQgWAEgRgKQgQgJgHgVQgFgQACgOQgJAAgJgFQgUgLgHgcQgFgTAFgRQAFgTANgKQAJgHAPgEIAagJIAMgFIgCgDQgJgZABgVQACgaAQgQQARgQAigCQAjgCASARQASARgCAfQgBAMgEANQAHgGAKgFQAcgPAYANQAWAKAKAjQALAkgKAcQgFAMgJAJQANAQAFAZQAFAagLAOQgIALgQADQgYAEgUgOQgQgMgGgTQABAigLAWQgIATgRALIgHADgAn+JKQgVgEgQgOQgPgPgEgSIgBgFQgnAFgdgNQgdgNgNgcQgJgWAFgUQgRAAgOgGQglgPgMgnQgIgZAJgYQAIgZAYgOQAOgJAbgHIAugLQAIgCANgGIgCgEQgSghADgeQADgiAcgXQAegWA8gCQA+gDAfAYQAgAXgDArQgBAPgHASQAMgJARgGQAygUAqARQAmAOATAvQATAygSAlQgJARgQAMQAXAVAIAjQAKAkgTATQgPAQgcADQgqAGgjgUQgcgQgMgaQACAvgSAdQgQAagdAPQgWAKgWAAQgKAAgJgCgAjzHjIABAAIAAgBgAGRH4Qg6gMgrgpQgqgogKgzQgCgHAAgGQhpAPhRgmQhOgigihPQgYg8AMg4QgsAAgogQQhlgqghhrQgVhEAYhCQAXhGBAgnQAogaBKgSIB6gfQAVgGAlgPIgHgMQgwhbAHhSQAJhgBOg9QBQg+CkgGQCngJBWBCQBWBAgHB2QgEAsgTAxQAigYAtgSQCIg3ByAuQBnApAzCCQA1CJgxBoQgXAvguAhQBAA6AWBfQAZBjgxA0QgpAshNAKQhyAPhfg2QhNgsgghIQAFCAgxBTQgqBHhRApQg8Adg8AAQgZAAgZgFgARmDZIACAAIAAgCg");
	this.shape.setTransform(120.6379,82.0636);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bubble, new cjs.Rectangle(0,0,241.3,164.2), null);


(lib.arrow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AhJOrIAAgHAhJOcIAA9AABKurIAAdJ");
	this.shape.setTransform(29.125,131.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0066").s().p("AhJO9IARgMIgFAGQgGAIgGAFgAAhObQgSgUgNgWIAAgBIAAgIIgBAHIgBgDIABAEQgLAFgSAVQgNAPgIAMIgBACIgXAOIAA9AIAIgCQAXgEAQgTIAHgJQAGgLADgLIAGALIADAEQAQAZAWAIQAQAFAVgEIAAdJQgYgOgRgOg");
	this.shape_1.setTransform(29.125,129.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("ABlVHQgZgJgTgTQghghgOg9QgSAvgrAeQgsAfgygBQgjgBgfgSQgfgSgRgdQgOgXgFggQgEgXAAglQAAgqAEgbQAGglARgaQASgdAuggQAhgWA9gkIAggTIAXgNIABgCQAIgMANgQQASgUALgFIgCgFIACAEIABgHIAAAHIAAACQANAVASAVQARANAYAOIARAKQA+AjAWATQA1AtAdBPQAbBHgNA0QgFAYgQAaQgKATgVAaQgSAYgPANQgUASgVAGQgLACgKAAQgPAAgQgFgAAOSDQAKAAABAUQAFAtARAnQAMAdASASQAVAWAaACQAtADAsg+QAjgvAHgmQAKgwgZhAQgehKgxgsQgOgNg9gqIgEgDQgtgfgTgcQAHAIAJAHQgLgKgIgNIAAgCIgBgBIAAAAIgEgHIgCAPQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAIAAgDIAAgBIAAAAIgBAAIABgBIADgOQgKAGgOAUIgDAEIARgLIgBACIgCACQgEAAgBABQgDACgBADIgIAFIgLAOIAOgIIgCADIgRANQgPAUgNAIIgDACIADgCQAGgFAGgIIAFgHIgRAMIhvBTQgpAfgQAYQgNAUgFAdQgEAVgCAhQgCAfABAPQABAZAGATQAMAnAjAYQAjAZAogDQAhgCAfgWQAcgUASggQARgdACgaQACgXALAAIABAAgAAINIIABABIAAABIgBgCgAh1vYQgZgRgOgcQgRgiAGgiQAFghAegiQARgTAigfQAlghAPgQQAOgPAVgcIAcgjIAAgCQABgGACgDQABgEADABQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAIABAGIAAABIAAABIABAGIABABQAIAjAFASQALAkAPAaQAIAOAOAUIAWAhQAbAoAGAfQAIAsgaAeQgOAQgbALQgLAEgKACQgVADgQgFQgWgIgRgYIgDgFIgFgLQgDAMgGAKIgHAKQgQASgXAFIgIABIgIABQgXAAgVgOgAgnzVQgMANgZAWQgYAWgLAMQgpAqgDAlQgCAeAPAcQAOAZAUANQAUANAXgBIAIgBQAWgEAPgQIAGgIQAGgKAEgMQgNgYgCgbQAFAXALAUQACgJgBgKQACAMgBALIAKAPIAHAJQAUAUATAEQAMACAPgEQAKgDALgGQAigRAIgSQAHgPgEgaQgEgYgHgRQgFgLgMgQIgTgbQgxhIgJhiIgBgDIgBgGIAAgDIgBgBQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAABQgCADAAAFIAEgFIgFAIIgCAIIAAgFQgrBFgeAgg");
	this.shape_2.setTransform(28.3363,135.6263);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0033").s().p("AB9U8QgagCgVgWQgSgSgMgdQgSgngEgtQgBgUgKAAQgMgBgDAYQgBAagRAdQgSAggcAUQgfAWghACQgoADgjgZQgjgYgMgnQgGgTgBgZQgBgPACgfQACghAEgVQAFgdANgUQAQgYApgfIBvhTIAAAIIgDACIADgCQANgIAPgUIARgNIACgDIgOAIIALgOIAIgFQABgDADgCQABgBAEAAIACgCIABgCIgRALIADgEQAOgUAKgGIgDAOIgBABIABAAIAAAAIAAABIAAADQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAIACgPIAEAHIAAAAIABABIAAACQAIANALAKQgJgHgHgIQATAcAtAfIAEADQA9AqAOANQAxAsAeBKQAZBAgKAwQgHAmgjAvQgqA7grAAIgEAAgAAKNUIAAgBIgBgBIABACgAhrvXQgUgNgOgZQgQgcADgeQADglApgqQALgMAYgWQAZgWAMgNQAeggArhFIAAAFIACgIIAFgIIABAGIABADQAJBiAxBIIATAbQAMAQAFALQAHARAEAYQAEAagHAPQgIASgiARQgLAGgKADQgPAEgMgCQgTgEgUgUIgHgJIgKgPQAAgLgBgMQABAKgCAJQgLgUgFgXQACAbANAYQgEAMgGAKIgGAIQgPAQgWAEIgIABIgFAAQgUAAgSgMg");
	this.shape_3.setTransform(28.2495,134.6069);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arrow, new cjs.Rectangle(0,0,56.7,271.3), null);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-301,-301,602,602);


(lib.wistle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.Symbol2();
	this.instance.setTransform(-47.45,1,1,1,0,0,0,19.5,20.9);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1).to({rotation:14.9989,x:-47.4,y:1.05},0).wait(1).to({rotation:0,x:-47.45,y:1},0).wait(1).to({rotation:14.9989,x:-47.4,y:-36.9},0).wait(1).to({rotation:0,x:-47.45,y:1},0).wait(1).to({rotation:29.9992,x:-22.15,y:-44.4},0).wait(1).to({rotation:0,x:-47.45,y:1},0).wait(1).to({rotation:-29.9992,x:-61.4,y:-23},0).wait(1).to({rotation:0,x:-47.45,y:1},0).wait(1).to({rotation:14.9989,x:-35.4,y:17.05},0).wait(1).to({rotation:0,x:-47.45,y:1},0).wait(3));

	// Layer_1
	this.instance_1 = new lib.Symbol1();
	this.instance_1.setTransform(109.8,77.9,1,1,0,0,0,109.8,77.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4).to({rotation:7.4995,x:110.8,y:77.95},0).wait(1).to({rotation:14.9989,x:111.8,y:77.9},0).wait(1).to({rotation:22.4984},0).wait(1).to({rotation:29.9979},0).wait(3).to({rotation:22.498},0).wait(1).to({rotation:14.9981,x:111.75},0).wait(1).to({rotation:0,x:111.8},0).wait(1).to({rotation:-7.4994,y:77.85},0).wait(1).to({rotation:-14.9989,y:77.9},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.6,-62.4,304.2,232.5);


(lib.smalharts = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol5();
	this.instance.setTransform(19.25,-7.15,1,1,0,0,0,10.1,15.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:10,x:33.7,y:-8.25},0).wait(1).to({x:44.55,y:-17.6},0).wait(1).to({x:47.5,y:-31.95},0).wait(1).to({x:37.2,y:-42.95},0).wait(1).to({x:23.7,y:-49.65},0).wait(1).to({x:16.05,y:-61.1},0).wait(1).to({x:20.5,y:-75.5},0).wait(1).to({x:29.1,y:-87.95},0).wait(1).to({x:43.15,y:-90.15},0).wait(1).to({x:57.3,y:-92.4},0).wait(1).to({x:66.05,y:-101.2},0).wait(1).to({x:71.15,y:-114.55},0).wait(1).to({x:72.95,y:-128.2},0).wait(1).to({x:61.4,y:-135.75},0).wait(1).to({x:49.05,y:-142.15},0).wait(1).to({x:38.35,y:-151.4},0).wait(1).to({x:36.4,y:-165.25},0).wait(1).to({x:41.9,y:-178.3},0).wait(1).to({x:59.45,y:-185.25},0).wait(1).to({x:76.75,y:-192.95},0).wait(1).to({x:93.45,y:-201.9},0).wait(1).to({x:108.35,y:-213.55},0).wait(1).to({x:109.1,y:-230.3},0).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(6.1,-245.4,113.10000000000001,253.3);


(lib.Scene_1_רקע_בניין = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// רקע_בניין
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6B3F1B").s().p("EhH7A5iIAAl2IlXAAIAAkTIOHAAIAAETIF4AAIAAF2gEgN6A1GIAAk4IL8AAIAAE4gEAw8A02IAAkoIKPAAIAAEogAtbZzIAAjqIIDAAIAADqgA0+CKIAAjZIJQAAIAADZgEhFJAB9IAAlrIH4AAIAAkEILxAAIAAEEIj5AAIAAFrgEA3SAA8IAAj5IoiAAIAAjKILNAAIAAHDgADogBIAAkZIMrAAIAAEZgAf5yxIAAkoIKPAAIAAisIoDAAIAAkZIIDAAIAAAIIEQAAIAAERIHcAAIAACsIoxAAIAAEogAFw4oIAAkEIMQAAIAAEEgEgkkgZ1IAAkpIs7AAIAAjaIJhAAIAAlXIFWAAIAAFXIh8AAIAADaIJ/AAIAAEpgEASXgpAIAAjHIk/AAIAAisIKxAAIAAFzgEBJkguvIAAjlIjvAAIAAhsIHeAAIAABsIgLAAIAADlgEgZng1nIAAj6ILdAAIAAD6g");
	this.shape.setTransform(44.525,300.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D28643").s().p("EignDFQMAAAmKfMFBPAAAMAAAGKfgEiAthU4IFXAAIAAF2IOoAAIAAl2Il3AAIAAkTIuIAAgEhBVhTeIL9AAIAAk4Ir9AAgEgCdhTuIKOAAIAAkoIqOAAgEhA2huxIIDAAIAAjqIoDAAgEhIZiGaIJRAAIAAjaIpRAAgEh4kiGnIPwAAIAAlsID6AAIAAkEIryAAIAAEEIn4AAgEgEqiLiIIhAAIAAD6ICrAAIAAnEIrMAAgEgvyiImIMsAAIAAkZIssAAgEgThibWINKAAIAAkoIIxAAIAAisInbAAIAAkRIkRAAIAAgIIoDAAIAAEZIIDAAIAACsIqPAAgEgtqihNIMRAAIAAkEIsRAAgEhk6inDIM8AAIAAEpIJ/AAIAAkpIp/AAIAAjaIB8AAIAAlXIlXAAIAAFXIphAAgEgmCi0sIFAAAIAADHIFyAAIAAlzIqyAAgEASai65IDvAAIAADlIDkAAIAAjlIAMAAIAAhsInfAAgEhNBi+MILcAAIAAj6IrcAAg");
	this.shape_1.setTransform(373.6,1174.4);

	this.instance = new lib.window_boy1("synched",0);
	this.instance.setTransform(-235.5,464.9,0.9999,0.9999,0,0,0,126.6,135);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6B3F1B").s().p("Eg+4A5iIAAl2IlXAAIAAkTIOIAAIAAETIF4AAIAAF2gEgE2A1GIAAk3IL7AAIAAE3gEA6BA03IAAkoIKPAAIAAEogAkWRwIAAjqIIBAAIAADqgAr6CKIAAjZIJQAAIAADZgEg8FAB9IAAlsIH3AAIAAkEILyAAIAAEEIj6AAIAAFsgEBAWAA8IAAj4IohAAIAAjLILNAAIAAHDgAMsgBIAAkZIMrAAIAAEZgEAo9gSyIAAkoIKPAAIAAisIoDAAIAAkYIIDAAIAAAIIERAAIAAEQIHcAAIAACsIoyAAIAAEogAO04oIAAkEIMQAAIAAEEgA7g52IAAkoIs7AAIAAjaIJgAAIAAlXIFXAAIAAFXIh8AAIAADaIJ/AAIAAEogEAbbgpBIAAjHIk/AAIAAirIKyAAIAAFygEgQjg1nIAAj6ILdAAIAAD6g");
	this.shape_2.setTransform(-15.675,296.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D28643").s().p("EignDFQMAAAmKfMFBPAAAMAAAGKfgEiAxhVeIFXAAIAAF3IOoAAIAAl3Il4AAIAAkSIuHAAgEhBYhUEIL8AAIAAk3Ir8AAgEgChhUTIKOAAIAAkoIqOAAgEhA5h3ZIICAAIAAjqIoCAAgEhIdiHAIJRAAIAAjaIpRAAgEh4oiHNIPwAAIAAlsID5AAIAAkEIrxAAIAAEEIn4AAgEgEtiMHIIhAAIAAD5ICrAAIAAnEIrMAAgEgv2iJMIMsAAIAAkZIssAAgEgTkib8INKAAIAAkpIIwAAIAAirInbAAIAAkRIkQAAIAAgIIoDAAIAAEZIIDAAIAACrIqPAAgEgtuihzIMRAAIAAkEIsRAAgEhk+inpIM7AAIAAEpIKAAAIAAkpIqAAAIAAjaIB9AAIAAlXIlXAAIAAFXIphAAgEgmGi1SIFAAAIAADHIFyAAIAAlzIqyAAgEhNFi+yILdAAIAAj6IrdAAg");
	this.shape_3.setTransform(371.775,1174.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.instance}]},202).wait(417));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_חלונות_בסיס = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// חלונות_בסיס
	this.instance = new lib.window_girl("synched",0);
	this.instance.setTransform(483.6,458,0.858,1.056,0,0,0,131.5,122.5);

	this.instance_1 = new lib.window_boy("synched",0);
	this.instance_1.setTransform(133.35,460.5,0.8489,1.0482,0,0,0,131.7,122.2);

	this.instance_2 = new lib.window_girl2("synched",0);
	this.instance_2.setTransform(275.9,89.95,0.4944,0.6658,0,0,0,126.7,135.1);

	this.instance_3 = new lib.yellowhead();
	this.instance_3.setTransform(4.65,71.75,1.2314,1.0024,-0.0017,0,0,20.4,17.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2,p:{regX:126.7,scaleX:0.4944,scaleY:0.6658,x:275.9,y:89.95}},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_2,p:{regX:126.7,scaleX:0.4944,scaleY:0.6658,x:275.9,y:89.95}},{t:this.instance_1},{t:this.instance}]},157).to({state:[{t:this.instance_2,p:{regX:126.7,scaleX:0.4944,scaleY:0.6658,x:275.9,y:89.95}},{t:this.instance_1},{t:this.instance}]},45).to({state:[{t:this.instance_2,p:{regX:126.6,scaleX:0.7042,scaleY:1.0768,x:-10.15,y:112.95}},{t:this.instance_1},{t:this.instance},{t:this.instance_3}]},206).wait(211));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_rbuttons = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// rbuttons
	this.start = new lib.play();
	this.start.name = "start";
	this.start.setTransform(159.75,180.2,1.3975,1.5161);
	new cjs.ButtonHelper(this.start, 0, 1, 2, false, new lib.play(), 3);

	this.replay = new lib.replay();
	this.replay.name = "replay";
	this.replay.setTransform(-108.7,38.2,0.9999,0.9999);
	new cjs.ButtonHelper(this.replay, 0, 1, 2, false, new lib.replay(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.start}]}).to({state:[]},2).to({state:[{t:this.replay}]},616).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.kiss = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.Symbol6();
	this.instance.setTransform(-30.15,-37.7,1,1,0,0,0,31.7,28);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1).to({scaleX:1.4156,scaleY:1.4805,x:-124.2,y:-58.2},0).wait(1).to({scaleX:1.8311,scaleY:1.961,x:-215.95,y:-82.55},0).wait(1).to({scaleX:2.2467,scaleY:2.4416,x:-305.55,y:-110.7},0).wait(1).to({scaleX:2.6622,scaleY:2.9221,x:-392.8,y:-142.7},0).wait(1).to({scaleX:3.0778,scaleY:3.4026,x:-477.9,y:-178.55},0).wait(1).to({scaleX:3.4934,scaleY:3.8831,x:-560.7,y:-218.1},0).wait(1).to({scaleX:3.9089,scaleY:4.3637,x:-641.25,y:-261.6},0).wait(1).to({scaleX:4.3245,scaleY:4.8442,x:-719.6,y:-308.85},0).wait(1).to({scaleX:4.74,scaleY:5.3247,x:-795.7,y:-359.95},0).wait(1).to({scaleX:5.1556,scaleY:5.8052,x:-869.55,y:-414.9},0).wait(1).to({scaleX:5.5712,scaleY:6.2857,x:-941.25,y:-473.65},0).wait(1).to({scaleX:5.9867,scaleY:6.7663,x:-1010.65,y:-536.2},0).wait(1).to({scaleX:6.4023,scaleY:7.2468,x:-1077.85,y:-602.6},0).wait(1).to({scaleX:6.8179,scaleY:7.7273,x:-1142.8,y:-672.8},0).wait(1).to({scaleX:7.2334,scaleY:8.2078,x:-1205.6,y:-746.85},0).wait(1).to({scaleX:7.649,scaleY:8.6883,x:-1266.15,y:-824.7},0).wait(1).to({scaleX:8.0645,scaleY:9.1689,x:-1324.4,y:-906.4},0).wait(1).to({scaleX:8.4801,scaleY:9.6494,x:-1380.55,y:-991.95},0).wait(1).to({scaleX:8.8957,scaleY:10.1299,x:-1434.4,y:-1081.3},0).wait(1).to({scaleX:9.3112,scaleY:10.6104,x:-1486.05,y:-1174.55},0).wait(1).to({scaleX:9.7268,scaleY:11.091,x:-1535.45,y:-1271.65},0).wait(1).to({scaleX:10.1423,scaleY:11.5715,x:-1582.7,y:-1372.6},0).wait(1).to({scaleX:10.5579,scaleY:12.052,x:-1627.65,y:-1477.4},0).wait(2));

	// Layer_1
	this.instance_1 = new lib.Symbol1();
	this.instance_1.setTransform(109.8,77.9,1,1,0,0,0,109.8,77.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4).to({rotation:7.4995,x:110.8,y:77.95},0).wait(1).to({rotation:14.9989,x:111.8,y:77.9},0).wait(1).to({rotation:22.4984},0).wait(1).to({rotation:29.9979},0).wait(3).to({rotation:22.498},0).wait(1).to({rotation:14.9981,x:111.75},0).wait(1).to({rotation:0,x:111.8},0).wait(1).to({rotation:-1.0713},0).wait(1).to({rotation:0,x:109.8},0).wait(1).to({rotation:7.4995,x:110.8,y:77.95},0).wait(1).to({rotation:14.9989,x:111.8,y:77.9},0).wait(1).to({rotation:22.4984},0).wait(1).to({rotation:29.9979},0).wait(3).to({rotation:22.498},0).wait(1).to({rotation:14.9981,x:111.75},0).wait(1).to({rotation:0,x:111.8},0).wait(1).to({regX:109.2,regY:78,rotation:-12.8562,x:111.7,y:77.85},0).wait(1).to({regX:109.8,regY:77.9,rotation:-13.9275,x:112.3,y:77.55},0).wait(1).to({rotation:-14.9989,y:77.6},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1962.4,-1814.9,2201.6,1995.3000000000002);


(lib.hartgirl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol4();
	this.instance.setTransform(17.9,15.2,1,1,0,0,0,17.9,15.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:1.75,y:16.35},0).wait(1).to({x:-13.45,y:16.8},0).wait(1).to({x:-27.7,y:16.55},0).wait(1).to({x:-41,y:15.6},0).wait(1).to({x:-53.35,y:14},0).wait(1).to({x:-64.8,y:11.6},0).wait(1).to({x:-75.25,y:8.55},0).wait(1).to({x:-84.75,y:4.75},0).wait(1).to({x:-93.35,y:0.3},0).wait(1).to({x:-100.95,y:-4.9},0).wait(1).to({x:-107.65,y:-10.8},0).wait(1).to({x:-113.35,y:-17.4},0).wait(1).to({x:-118.15,y:-24.7},0).wait(1).to({x:-122,y:-32.7},0).wait(1).to({x:-124.9,y:-41.4},0).wait(1).to({x:-126.85,y:-50.85},0).wait(1).to({x:-127.85,y:-60.95},0).wait(1).to({x:-127.9,y:-71.8},0).wait(1).to({x:-127,y:-83.3},0).wait(1).to({x:-125.2,y:-95.55},0).wait(1).to({x:-122.4,y:-108.5},0).wait(1).to({x:-118.7,y:-122.15},0).wait(1).to({x:-114,y:-136.5},0).wait(1).to({x:-108.4,y:-151.6},0).wait(1).to({x:-101.85,y:-167.35},0).wait(1).to({x:-94.3,y:-183.85},0).wait(1).to({x:-85.85,y:-201.05},0).wait(1).to({x:-76.45,y:-218.95},0).wait(1).to({x:-66.1,y:-237.6},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-145.8,-252.8,181.60000000000002,284.8);


(lib.hartboy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol4();
	this.instance.setTransform(17.9,15.2,1,1,0,0,0,17.9,15.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:29.25,y:14.3},0).wait(1).to({x:40.15,y:12.85},0).wait(1).to({x:50.65,y:10.85},0).wait(1).to({x:60.7,y:8.25},0).wait(1).to({x:70.25,y:5.1},0).wait(1).to({x:79.4,y:1.35},0).wait(1).to({x:88.1,y:-2.9},0).wait(1).to({x:96.35,y:-7.75},0).wait(1).to({x:104.2,y:-13.15},0).wait(1).to({x:111.55,y:-19.1},0).wait(1).to({x:118.45,y:-25.6},0).wait(1).to({x:124.95,y:-32.7},0).wait(1).to({x:131,y:-40.35},0).wait(1).to({x:136.6,y:-48.55},0).wait(1).to({x:141.75,y:-57.3},0).wait(1).to({x:146.45,y:-66.65},0).wait(1).to({x:150.75,y:-76.55},0).wait(1).to({x:154.55,y:-87},0).wait(1).to({x:157.95,y:-98},0).wait(1).to({x:160.9,y:-109.6},0).wait(1).to({x:163.4,y:-121.75},0).wait(1).to({x:165.45,y:-134.45},0).wait(1).to({x:167.05,y:-147.7},0).wait(1).to({x:168.25,y:-161.55},0).wait(1).to({x:169,y:-175.95},0).wait(1).to({x:169.25,y:-190.9},0).wait(1).to({x:169.1,y:-206.4},0).wait(1).to({x:168.5,y:-222.5},0).wait(1).to({x:167.5,y:-239.2},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-254.4,187.1,284.8);


(lib.girlpountmove = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("EgBJggZQA4CTAAB3QABB5g5BcImwATQAglzlDjmQjAFzAOFzIl4gBQA6YHKEEHQACgGABgHAGM4nIllAAQAuh0hmh0AJI35QgCBJgEBFQg+UunHFZQAbC/BvBqEgRvgm2QCwlfKMBiQR0CGBGRtMAADAhKQHgCdD5HfQGaKVg1MjInfgSQiFutl4iNIgDgFIAAgBQABADACADQD0HxiIJRMghxgAaQhZnfDToqQl9HRArJeIrcAJQBTtZD0n5QEFobG8iIIBdggQClgBA7lAQCeBBDmggQC0gMCNhsAGM4nIC2C8AES/XQDbDqhhDGEgP0gnSQhAALg7ARQpNCogBLUMAA3AuxA0N58QhqBRAxCQAA6D+QABAPACAPAtoK0QAcHQKAhLQG9g7gqm5QGQgfEzBkAtoK0QmXEaEoFfQFEF/FpoMQD2GbGHkhQGHlZoTl8");
	this.shape.setTransform(199.8088,276.1555);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0767AC").s().p("AqpEjQkoleGXkaQAcHPJ/hLQG+g6gqm5QITF8mHFYQmIEhj2mbQjPEvjFAAQiPAAiJiig");
	this.shape_1.setTransform(169.6341,379.5737);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#079BF4").s().p("A6GkLQEFocG8iIIBdgfQmXEZEoFfQFEF/FpoMQD2GcGHkiQGHlYoTl8QGQgfEzBkQHgCcD5HfQGaKUg1MkInfgTQiFusl4iNIgDgFIAAAAIADAFQD0HxiIJQMghxgAZQhZnfDToqQl9HQArJeIrcAKQBTtaD0n3g");
	this.shape_2.setTransform(199.8088,442.9332);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FBB398").s().p("AnlTTQClgBA6lAIADABIACABIABAAQBoAqCHAAIAAAAIAAAAQA/AABHgKIABAAIAHgBQC0gMCOhsQAbC/BvBqQAqG5m+A7QhaAKhNAAQncAAgXmPgAgRO+QiHAAhogqIgBAAIgCgBIgDgBIADgNIgDANQqDkHg74HIF4ABQgNlzDAlzQFCDmggFzIGvgTQA5hcAAh5QBmB0gtB0IFkAAIC3C8Qg/UtnHFaIgDgeIADAeQiOBsi0AMIgHABIgBAAQhHAKg/AAIAAAAIAAAAgAkGOSIAAAAgAG/M7IAAAAg");
	this.shape_3.setTransform(161.2,221.8783);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FEA112").s().p("A0juRQACrUJMioQCwlfKLBiQR1CGBGRtMAADAhKQkyhkmRAfQhvhqgbi/QHHlaA/0tQADhFAChJQgCBJgDBFIi3i8QAeg9AAhAQAAiRiYiiQCYCiAACRQAABAgeA9IlkAAQAth0hmh0QAAB5g5BcImvATQAglzlCjmQjAFzANFzIl4gBQgPgtAAgnQAAhVBIg4QhIA4AABVQAAAnAPAtQA7YHKDEHQg6FAilABIheAgQm8CIkFIbgAGJxmQgBh3g4iTQA4CTABB3gArV8NQA7gRBAgLQhAALg7ARg");
	this.shape_4.setTransform(158.8,208.0555);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(3,1,1).p("EgBJggZQA3CTABB3QAAB5g4BcImwATQAflzlCjmQjAFzAOFzIl4gBQA6YHKEEHQABgGABgHAGL4nIlkAAQAuh0hmh0AJH35QgCBJgDBFQg/UunGFZAGL4nIC3C8AER/XQDcDqhiDGEgRvgm2QCvlfKMBiQR1CGBFRtIAAfQQJOCAD0I5QE1LSg2MjInfgSQiEutl8mUQD4L4iJJRMghxgAaQhZnfDToqQl9HRArJeIrcAJQBTtZD0n5QEFobG9iIIBdggQClgBA7lAQCdBBDmggQC1gMCNhsEgP0gnSQhBALg6ARQpNCogCLUMAA3AuxA0O58QhqBRAyCQAA5D+QACAPACAPQAbC/BuBqAtoK0QAbHQKAhLQG9g7gqm5QGRgfEvgWAtoK0QmYEaEoFfQFFF/FpoMQD1GbGIkhQGHlZoUl8");
	this.shape_5.setTransform(199.8948,276.1555);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#079BF4").s().p("A6Hj1QEFobG9iIIBdgfQmYEZEoFfQFFF/FpoMQD1GbGIkhQGHlYoUl9QGRgfEvgVQJOB/D0I5QE1LRg2MjInfgSQiEutl8mTQD4L4iJJQMghxgAaQhZneDToqQl9HQArJeIrcAKQBTtaD0n4g");
	this.shape_6.setTransform(199.8948,440.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FBB398").s().p("AnlTTQClgBA6lAIADABIACABIABAAQBoAqCHAAIAAAAIAAAAQA/AABHgKIABAAIAHgBQC0gMCOhsQAbC/BvBqQAqG5m+A7QhaAKhNAAQncAAgXmPgAgRO+QiHAAhogqIgBAAIgCgBIgDgBIADgNIgDANQqDkHg74HIF4ABQgNlzDAlzQFCDmggFzIGvgTQA5hcAAh5QBmB0gtB0IFkAAIC3C8Qg/UtnHFaIgDgeIADAeQiOBsi0AMIgHABIgBAAQhHAKg/AAIAAAAIAAAAgAkGOSIAAAAg");
	this.shape_7.setTransform(161.2,221.8783);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FEA112").s().p("A0iuRQACrUJNioQCvlfKMBiQR1CGBFRtIAAfQQkvAWmRAfQhuhqgbi/QHGlaA/0tQAEhFAChJQgCBJgEBFIi3i8QAeg9AAhAQABiRiZiiQCZCigBCRQAABAgeA9IlkAAQAuh0hnh0QABB5g5BcImvATQAglzlDjmQjAFzAOFzIl4gBQgQgtAAgnQAAhVBIg4QhIA4AABVQAAAnAQAtQA6YHKEEHQg7FAilABIhdAgQm8CIkGIbgAGKxmQgBh3g3iTQA3CTABB3gArT8NQA7gRBAgLQhAALg7ARg");
	this.shape_8.setTransform(158.65,208.0555);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(3,1,1).p("EgDFggvQA4CTABB3QAAB5g5BcImvATQAflzlCjmQjAFzANFzIl4gBQA7YHKDEHQACgGABgHAEQ49IljAAQAuh0hnh0AHM4PQgCBJgEBFQg+UunGFZAEQ49IC2C8ACW/tQDcDqhiDGEgTrgnMQCwlfKMBiQR0CGBGRtIAAfQQLziQEPKOQEOKPAcHJIgcAAEgRwgnoQhAALg7ARQpNCogBLUMAA3AuxQEFobG8iIIBeggQClgBA6lAQCeBBDmggQC1gMCNhsA2J6SQhqBRAxCQAhBDoQACAPABAPQAcC/BtBqAvjKeQAbHQKAhLQG9g7gqm5QGRgfEvgWEAcCAhQIhfAAQiMt+qqCDQD4L4iJJRMghxgAaQhZnfDToqQl9HRArJeIrcAJQBTtZD0n5EAcCAhQIBwGcQg8Agg+BsQC8DOCWjOQgphvg+gfIA4magAvjKeQmYEaEoFfQFEF/FpoMQD2GbGIkhQGHlZoUl8");
	this.shape_9.setTransform(212.2,278.3518);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#079BF4").s().p("A75jnQEGocG8iIIBdgfQmYEZEpFfQFEF/FpoMQD2GcGHkiQGHlYoUl8QGRgfEvgWQLziREPKPQEPKNAbHJIgcAAIkZAAIheAAQiMt9qrCDQD4L4iIJQMghygAZQhYnfDToqQl9HQAqJeIrcAKQBTtaD0n3g");
	this.shape_10.setTransform(211.25,439.3366);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FBB398").s().p("EAW0AlUQA+hsA8ggIhwmcIEZAAIg4GaQA+AfApBvQhLBnhVAAQhUAAhehngA0nF6QClgBA7lAIACABIACABIABAAQBoAqCHAAIAAAAIAAAAQBBAABHgKIABAAIAGgBQC1gMCOhrQAbC+BuBqQAqG5m+A7QhZAKhOAAQndAAgXmPgAtTBlQiHAAhogqIgBAAIgCgBIgCgBIACgNIgCANQqEkGg64IIF4ABQgOlzDAlzQFCDmgfFzIGwgTQA4hcAAh5QBnB0guB0IFkAAIC2C8Qg/UunFFaIgEgeIAEAeQiOBri1AMIgGABIgBAAQhHAKhBAAIAAAAIAAAAgAxHA5IAAAAg");
	this.shape_11.setTransform(244.575,307.5712);

	this.instance = new lib.girlpointdone();
	this.instance.setTransform(246,272.7,1,1,0,0,0,245.3,272.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("AYYghQgFAXgFAXMghxgAYQgCgLgCgLAs+ghQABAdACAdIrcAKQADgjAEgh");
	this.shape_12.setTransform(156.0125,548.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#079BF4").s().p("A4QgiILSAAIADA7IrcAKIAHhFgApjgMIgEgWMAh/AAAIgKAvg");
	this.shape_13.setTransform(156.0125,548.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_1},{t:this.shape_5}]},3).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_1},{t:this.shape_5}]},2).to({state:[{t:this.shape_8},{t:this.shape_11},{t:this.shape_10},{t:this.shape_1},{t:this.shape_9}]},2).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.instance}]},3).wait(57));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,494.4,559.7);


(lib.barakmoving = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol3();
	this.instance.setTransform(25.8,35.4,1,1,0,0,0,25.8,35.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({rotation:9.4524,x:41.4,y:25.4},0).wait(1).to({rotation:1.9526,x:39.5,y:20.15},0).wait(1).to({rotation:-5.5472,x:37.55,y:14.85},0).wait(1).to({rotation:-13.047,x:35.7,y:9.55},0).wait(1).to({rotation:-20.5468,x:33.8,y:4.25},0).wait(3).to({rotation:-5.5472,x:40.35,y:-4.95},0).wait(1).to({rotation:9.4524,x:47,y:-14.2},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-54.3,76.7,126.1);


(lib.arrowmoving = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AaVRMIgEAAIgcgCIgEAAIgDAAIhJgIIi8gnIhNgYIiLg1IhHgiIgEgCIgJgEIhzhCIiqh7IhrhkIhQhZIhLhiIgegtIglg+Ig3hxIAAgCIABAAICvCxIAUATIBCA+QAvAqA0ArICvCFICeBmIDBBqIAEACIASAJIF3CoIAAAAIgBABgA27J2IgJgCIgBAAIgCgBIgigHIgVgGIhjgiIgmgTIAAgBIABgBIAMAAIADABIAbAAIADABIA8ABIAJAAIAKAAIBKgCIAJgBIAugEIAwgIIATgEIADgBIADgBIAQgDIADgBIAJgDIADgBIA4gTIADgBIABgBIACgBIAYgLIABgBIACgBIAngVIAAAAIACgBIADgCIAxgkIAVgSIBAhGIALgQIACgBIAzhQIAzhiIB+lDIABAAIABABIACAnIABADIgEB/IgaCYIgUBDIgaBEIgOAdQgGAOgJAQIgQAcQgkA8gvAwQgyAzg8AiIgHAFIgEACIhJAhIg3APIg6AKIgEAAIgTACIhEABgAG8j4IgDAAIgCAAIgegEIhzgaIhygpIh7hBIgOgKIAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAQABAAAAAAIB8AfIAyAKIA6AJIArAFIAEAAIAYADIAJAAIBhADIAJAAIA7gEIAugEIACgBIABAAIABAAIAFgBIBZgQIADgBIAHgCIBagaICKg7IBDgjICwh1IAygnIAEgEICKh4IBRhOIADgEIAEgCIDwj8IABAAQAAAAABAAQAAAAAAAAQAAAAAAAAQAAABgBAAIhXCgIggAyIhaB8Ih0CHIh5BzIgCABIgCACIgtAkIgFAEIgmAcIgnAbQgiAWgwAaIhWArQgsAUgtAPIghALIgCAAIg3AOQgvALgsAFQgrAFgtACgAunmdIgLgBIgEAAIhCgOIgDgBIgvgQIhhguQgvgbg5goIh1hhIg/g8QgpgogignIghgnIh6ilIgGgKIgJgPIgCgCIgDgIIgCgCIAAgBIABgBIGaE4QAnAfA1AmQAxAlAsAcIAvAcIAuAZIAXALIADABIACACIAtARIACABIALADIAsAJIAUAAIATAAIARgDIARgFIAQgGIAcgPIAMgJQAKgIALgKIAQgRIAGgIIAOgRIABAAQABAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIgCALIgPArIgOAcIgBACIgWAdIghAdQgMAIgJAEIgYALIgaAHIgcAGQgOABgOAAIgdgBg");
	this.shape.setTransform(-345.425,-924.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AGPOeIAAgEIAAghIgBgDIABgDIAAgLIARjpQAIg+AHgqIANhRIA2j7IAchrIAfhjIBXjrIAQghIABAAIABABIAAADIAAAhIABACIgBADIgRD1QgIA8gGAqIgqDeIg2DaIgeBkIhRDbIgXAxIgBABgAjZCUIAAgBIAMgbIAAgCIBjiqQAdgsARgXIA1hFIA4hHIA8hDIA8hAIA6g5ICYh8IABgBIACgBIAYgQIABAAIABABIgMAbIAAACIhjCrQgeAsgRAXIg0BGQgfAngbAfIg7BDIg9BAIg5A4IiXB8IgCABIgCACIgYAPgAqWpUIAAgBIAcgTIC8hkIBRgjIBYgiQAigNA6gTIBdgdIBbgZIBVgUICtgeIAjgDIADAAIACAAIAEgBIAbAAIABAAIgBABIgcATIi7BjIhSAjIhWAjQgjANg5AUIhdAdIhbAZIhWAUIiSAZIg+AGIgDABIgCAAIgEAAIgbACg");
	this.shape_1.setTransform(-506.85,-874.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AK1N1IgCgEIgBgEIgBgCIgHgcIgShKIgeiqIgWjVQgGg+gCg1IgDhyIAAhvIADhmIAXj2IAAgDIAGgiIABgDIABgBIABAAIACADIABAFIABADIAZBlIAdCqIAXDVQAFA9ACA0IAEBzIAABvQgBA2gCAxIgXD1IAAAEIgIAmIAAABgAhpElIADgZIACgEIAAgCIAAgDIAyi8QARgvALgdIAghRQARgnAUgrIAohRIAqhNQAVglAVghIAegwIBVhwIAVgYIABAAIAAABIgDAZIgBAEIAAACIgzC/QgRAvgLAeIghBRQgQAngVArIgnBRIgrBMQgVAlgVAhIhYCBIgvA2IgBABgArXk2IAAgBIAWgZIACgCIB6h0IAQgOIAQgNQAbgXAqggIBMg4IBRg3QArgcAngYIBRgwIBOgpIC/hWIADAAIACgBIAegKIABAAIAAACIgXAZIgBACIh5B0IgQAOIgQANQgbAXgqAgIhMA4IhRA3QgrAcgnAYIhRAwIhOApIjABWIgDAAIgCABIgeAJg");
	this.shape_2.setTransform(-474.9,-949.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AK1N1IgCgEIgBgEIgBgDIggiKIgtlbQgGg9gCg0IgDhzIAAhvIADhnIAFhdIASiXIAAgDIAFgfIACgIIABgBIABABIACAEIABAEIABADIAHAbIAvD0IAXDUQAFA+ACA0IAEBzIAABvQgBA2gCAyIgWDoIgBANIAAACIgGAfIgCAHIAAACgAhpElIADgZIACgEIAAgCIAAgDIAyi8QARgwALgcIAghRQARgnAUgrIAohRIAqhMQAVgmAVghIBzihIAVgWIABgBIAAABIgDAZIgBAEIAAACIgzC+QgRAxgLAdIghBRQgQAngVArIgnBRIgrBLQgVAmgVAhIhYCBIgvA3IgBAAgArXk1IAAgCIAWgZIACgCIB6h1IAQgNIAQgNQAbgXAqggIBMg4IBRg3QArgcAngYIBRgwIBOgqIC/hUIADgBIACgBIAegJIABAAIAAABIgXAZIgBACIh5B1IgQAMIgQAOQgbAXgqAgIhMA4IhRA3QgrAdgnAXIhRAwIhOApIjABVIgDABIgCABIgeAKg");
	this.shape_3.setTransform(-474.9,-1122.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AESDtIgTgIIgCgBIgCgBIgNgGIgFgCIgEgDIgQgIIg7gnIgDgDIgXgRIgDgDIgDgCIgWgSIgBgBIgCgBIg3g4IgBgBIgBgCIgNgRIAAgBQAAAAAAAAQAAgBAAAAQABAAAAAAQAAABABAAIATAIIABABIACAAIANAHIAFACIAFADIAKAFIBBAqIACACIAYASIACACIAEACIAVATIABABIACABIA3A3IABACIACABIAMARIAAABIAAACIgBgBgAjBAMIgDAAIgDAAIgFgBIgDAAIgtgJIgOgDIgCgBIgDgBIgDgBIAAgBIAAgBIAGgCIACgBIA7gNIADAAIAFgBIADAAIAegCIALAAIApACIACAAIAGABIADAAIA7ANIACABIAFACIABABIgBABIgCABIgDABIgCABIg7AMIgDAAIgGABIgCAAIhFABgAAYgeIAAgTIAJguIABgCIABgFIACgCIAAgCIAAgBIAHgTIAAgDIAWgtIAAgCIAEgGIABgCIACgCIAJgQIAFgGIACgEIAPgTIAHgGIABABIAAATIgJAuIgBACIgBAFIgBACIAAACIgBABIgHATIAAADIgWAtIAAACIgEAGIgBACIgBACIgFAIIgKAOIgCAEIgQATIgGAGg");
	this.shape_4.setTransform(-326.25,-1928.1429);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},73).to({state:[{t:this.shape_1}]},11).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},3).to({state:[{t:this.shape_4}]},7).to({state:[]},25).to({state:[]},68).wait(75));

	// Layer_1
	this.instance = new lib.Symbol7();
	this.instance.setTransform(28.3,135.6,1,1,0,0,0,28.3,135.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({rotation:-0.2778,y:123.25},0).wait(1).to({rotation:-0.5555,y:110.9},0).wait(1).to({rotation:-0.8333,y:98.5},0).wait(1).to({rotation:-1.111,x:28.35,y:86.1},0).wait(1).to({rotation:-1.3888,y:73.7},0).wait(1).to({rotation:-1.6665,y:61.4},0).wait(1).to({rotation:-1.9443,y:48.95},0).wait(1).to({rotation:-2.2221,y:36.6},0).wait(1).to({rotation:-2.4998,x:28.3,y:24.2},0).wait(1).to({rotation:-2.7776,y:11.9},0).wait(1).to({rotation:-3.0553,x:28.35,y:-0.55},0).wait(1).to({rotation:-3.3331,y:-12.95},0).wait(1).to({rotation:-3.6108,y:-25.3},0).wait(1).to({rotation:-3.8886,y:-37.65},0).wait(1).to({rotation:-4.1664,x:28.3,y:-50.05},0).wait(1).to({rotation:-4.4441,y:-62.4},0).wait(1).to({rotation:-4.7219,y:-74.8},0).wait(1).to({rotation:-4.9996,y:-87.15},0).wait(1).to({rotation:-5.2774,y:-99.6},0).wait(1).to({rotation:-5.5551,x:28.35,y:-111.95},0).wait(1).to({rotation:-5.8329,y:-124.35},0).wait(1).to({rotation:-6.1107,y:-136.65},0).wait(1).to({rotation:-6.3884,x:28.3,y:-149.1},0).wait(1).to({rotation:-6.6662,x:28.35,y:-161.45},0).wait(1).to({rotation:-6.9439,y:-173.8},0).wait(1).to({rotation:-7.2217,x:17.2,y:-193.6},0).wait(1).to({rotation:-7.4994,x:6,y:-213.4},0).wait(1).to({rotation:-7.7772,x:-5.1,y:-233.2},0).wait(1).to({rotation:-8.055,x:-16.3,y:-252.95},0).wait(1).to({rotation:-8.3327,x:-27.45,y:-272.75},0).wait(1).to({rotation:-8.6105,x:-38.55,y:-292.5},0).wait(1).to({rotation:-8.8882,x:-49.75,y:-312.25},0).wait(1).to({rotation:-9.166,x:-60.9,y:-332.05},0).wait(1).to({rotation:-9.4438,x:-72.05,y:-351.85},0).wait(1).to({rotation:-9.7215,x:-83.2,y:-371.6},0).wait(1).to({rotation:-9.9993,x:-94.35,y:-391.35},0).wait(1).to({rotation:-10.277,x:-105.5,y:-411.2},0).wait(1).to({rotation:-10.5548,x:-116.65,y:-430.95},0).wait(1).to({rotation:-10.8325,x:-127.8,y:-450.65},0).wait(1).to({rotation:-11.1103,x:-138.95,y:-470.5},0).wait(1).to({rotation:-11.3881,x:-150.15,y:-490.25},0).wait(1).to({rotation:-11.6658,x:-161.3,y:-510},0).wait(1).to({rotation:-11.9436,x:-172.4,y:-529.8},0).wait(1).to({rotation:-12.2213,x:-183.6,y:-549.6},0).wait(1).to({rotation:-12.4991,x:-194.7,y:-569.35},0).wait(1).to({rotation:-12.7768,x:-205.85,y:-589.15},0).wait(1).to({rotation:-13.0546,x:-217,y:-608.9},0).wait(1).to({rotation:-13.3324,x:-228.2,y:-628.7},0).wait(1).to({rotation:-13.6101,x:-239.35,y:-648.45},0).wait(1).to({rotation:-13.8879,x:-254.65,y:-670.95},0).wait(1).to({rotation:-14.1656,x:-269.9,y:-693.45},0).wait(1).to({rotation:-14.4434,x:-285.25,y:-715.95},0).wait(1).to({rotation:-14.7211,x:-300.55,y:-738.45},0).wait(1).to({rotation:-14.9989,x:-315.8,y:-760.9},0).wait(1).to({rotation:-10.908,x:-331.1,y:-783.4},0).wait(1).to({rotation:-6.8172,x:-346.4,y:-805.9},0).wait(1).to({rotation:-2.7263,x:-361.7,y:-828.4},0).wait(1).to({rotation:1.3645,x:-377,y:-850.95},0).wait(1).to({rotation:5.4554,x:-392.3,y:-873.35},0).wait(1).to({rotation:9.5462,x:-407.6,y:-895.9},0).wait(1).to({rotation:13.6371,x:-422.85,y:-918.35},0).wait(1).to({rotation:17.7279,x:-408.25,y:-945.8},0).wait(1).to({rotation:21.8188,x:-393.6,y:-973.2},0).wait(1).to({rotation:25.9096,x:-378.95,y:-1000.6},0).wait(1).to({rotation:30.0005,x:-364.35,y:-1027.95},0).wait(1).to({rotation:28.9291,y:-1082.8},0).wait(1).to({rotation:27.8578,y:-1137.7},0).wait(1).to({rotation:26.7864,y:-1192.55},0).wait(1).to({rotation:25.715,y:-1247.4},0).wait(1).to({rotation:24.6437,y:-1302.3},0).wait(1).to({rotation:23.5723,y:-1357.15},0).wait(1).to({rotation:22.501,y:-1411.95},0).wait(1).to({rotation:21.4296,y:-1466.9},0).wait(1).to({rotation:20.3582,x:-364.3,y:-1521.7},0).wait(1).to({rotation:19.2869,x:-364.35,y:-1576.55},0).wait(1).to({rotation:18.2155,x:-364.3,y:-1631.45},0).wait(1).to({rotation:17.1441,y:-1686.3},0).wait(1).to({rotation:16.0728,x:-364.35,y:-1741.15},0).wait(1).to({rotation:15.0014,x:-364.3,y:-1796},0).wait(167));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-573.1,-1951.9,643.8000000000001,2223.2000000000003);


(lib.Scene_1_אלמנטים = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// אלמנטים
	this.instance = new lib.smalharts();
	this.instance.setTransform(308.6,515.6,1,1,0,0,0,26.2,-69.2);

	this.instance_1 = new lib.smalharts();
	this.instance_1.setTransform(343.8,398.8,1,1,0,0,0,26.2,-69.2);

	this.instance_2 = new lib.smalharts();
	this.instance_2.setTransform(240.5,477.85);

	this.instance_3 = new lib.barakmoving();
	this.instance_3.setTransform(290.4,43.8,0.248,0.4576,0,0,180,25.8,35.4);

	this.instance_4 = new lib.hartgirl();
	this.instance_4.setTransform(493.9,465.35,1,1,0,0,0,83.5,-58.7);

	this.instance_5 = new lib.hartboy();
	this.instance_5.setTransform(168.85,518.05,1,1,0,0,0,17.9,15.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A30000").s().p("AgpGxQgGgKgKgIIgTgNQgZgSgHgTQgIgXALgYQAFgKAGgDQAHgFAOAGQAHADAGAFQAFgXAOgLQAPgLAQAHQAQAGAGAUQAHATgIAZQgHAUgUAfQgXAggHASIAFgOgAG0D3QgFgEgGgEIgNgHQgSgIgEgKQgGgLAIgMQADgFAEgBQAFgDAKADIAJAEQADgMAKgFQAKgFALADQAMADAEAKQAFAJgGANQgFAKgOAPQgQAQgFAJIAEgIgAEaDeQgGgJgKgIIgTgOQgZgRgHgTQgIgXALgYQAFgLAGgDQAHgFAOAGQAHADAGAFQAFgXAOgKQAPgLAQAGQARAHAGATQAHAUgIAYQgHAUgVAfQgXAhgHARIAFgOgAjrBSQgFgFgGgEIgNgGQgSgJgEgJQgGgLAIgMQADgGAEgBQAFgDAKADIAJAFQADgMAKgFQAKgGALAEQAMADAEAJQAFAKgGAMQgFAKgOAPQgQAQgFAJIAEgHgAmLBIQgIgKgKgIIgWgNQgcgSgHgTQgKgWANgYQAFgKAHgDQAIgFAQAGQAHADAIAFQAEgXARgLQAQgLATAHQATAGAGAUQAIATgJAZQgIATgXAfQgaAfgHASIAFgNgADUAeQgEgHgHgGIgNgJQgRgMgFgOQgFgQAHgSQAEgHAEgCQAFgEAJAEQAFACAEAEQADgRAKgHQAKgIAMAFQALAEAEAOQAFAOgFASQgFAPgPAVQgQAXgEANIADgKgAFrgeQgHgJgJgIIgUgOQgZgRgGgTQgJgXAMgYQAEgLAHgDQAHgFAOAGQAGADAHAFQAEgXAPgKQAOgLARAGQARAHAFATQAHAUgIAYQgHAUgVAfQgXAhgGARIAFgOgAjZjjQgGgKgKgIIgTgNQgZgSgHgTQgIgXALgYQAFgKAGgDQAHgFAOAGQAHADAGAFQAFgXAOgLQAPgLAQAHQARAGAGAUQAHATgIAZQgHAUgVAfQgXAggHASIAFgOgAAGlKQgGgHgJgGIgTgJQgZgNgHgOQgIgQALgSQAFgHAGgDQAHgDAOAEIANAGQAFgRANgHQAPgIAQAEQARAFAGAOQAHAOgIASQgHAPgVAWQgXAXgHANIAFgKg");
	this.shape.setTransform(474.8517,19.044);

	this.instance_6 = new lib.lightmoving("synched",0);
	this.instance_6.setTransform(353.95,-41.85,0.8723,0.7092);

	this.instance_7 = new lib.lightnotmoving("synched",0);
	this.instance_7.setTransform(389.55,-15.75,1.394,0.9994,0,0,0,36,53.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FAB7AE").s().p("AgDALQgIgNACgTQACAXAHAKQADAFAHAFQgJAAgEgLg");
	this.shape_1.setTransform(276.2702,152.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(0.1,1,1).p("AgvAlQAJgDAIgDQAwg7AegIQgiAtgrAVQAAABgBAA");
	this.shape_2.setTransform(274.875,118.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CC3366").s().p("AAnghQgiAtgqAVIgBABQAvg7AegIg");
	this.shape_3.setTransform(275.7125,117.8375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(0.1,1,1).p("AgvApQAJgCAIgEQABAAAAAAQAUgKAQgOAgeAjQAkhlAqAiQgTAagWARAAPgOQAGANgOAM");
	this.shape_4.setTransform(274.875,117.7121);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CC3366").s().p("AAngcQgSAZgVARQAIgJABgIQAAgEgCgDQACADAAAEQgBAIgIAJQgSAOgTAKIgBAAQAlhlAoAjgAAAAOIAAAAg");
	this.shape_5.setTransform(275.7125,117.3996);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(0.1,1,1).p("AgeAtQAkiTAqBQQgRAWgSAQAAOgSQAEARgFARAgvAzQAJgDAIgDQABgBAAAAQAUgJAQgPQABgBABgBQACgBACgB");
	this.shape_6.setTransform(274.875,116.7538);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CC3366").s().p("AAngTQgQAVgTARQADgKAAgJQABgHgCgHQACAHgBAHQAAAJgDAKIgDADIgBABQgSAPgTAJIgBABQAliTAoBQg");
	this.shape_7.setTransform(275.7125,116.4413);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(0.1,1,1).p("AAOgKQAEAQgFARAgvA6QAJgCAIgEQABAAAAAAQAUgKAQgOQABgBABgBQACgBACgCAgeA0QApiyAlBvQgRAWgSAQ");
	this.shape_8.setTransform(274.875,116.0061);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#CC3366").s().p("AAngLQgQAVgTAQIgDADIgBACQgSAOgTAKIgBAAQApiyAkBwgAAEAaQADgKAAgKQABgGgCgHQACAHgBAGQAAAKgDAKg");
	this.shape_9.setTransform(275.7125,115.6936);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(0.1,1,1).p("AgvA6QAJgCAIgEQApiyAlBvQgRAWgSAQAAOgKQAEAQgFARAgeA0QABAAAAAAQAUgKAQgOQABgBABgBQACgBACgC");
	this.shape_10.setTransform(274.875,116.0061);

	this.instance_8 = new lib.keshet();
	this.instance_8.setTransform(-39.1,219,0.2754,0.2573,0,0,0,189.9,164.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(0.1,1,1).p("AA7jeQBdhGAmBgQADAGACAJQABACABAEIAXgTQgDgIgEgGQg9h8hdA9gADKhHQgJgUgHgQQgPgegPgTQgggogdAMQgWgHgOANACdgrQAFAAAEgBQAMgFAFgQQAEgQgBgaAjbiaQAJgOAIgNQBtirBLBlIgBAnQgwgshCA+QgMAJgKAMQgTAWgWAegAjAg7QAKgTAJgRAiLgfQgGAAgFgBQgbgJAEg2QARgdATgTQAlgpAjANQAZgHASANAiggFQAEgFAEgFQAGgIAHgIQAlgoA6gVQANgGANgDABZhjQgFgEgHgBQgKgHgMgDACdgrQgJgMgLgKQgEgFgEgEAgMgKQACADACACQAKAPALAEIABAAQACABACABQADgCADAAQALgHAMgRACvgPQgDgGgEgGQgFgIgGgIABNhoQgcgtAugjAgshcQAhgsg2gjABZBbQACAJABAIQAOBHAdAdAAjCFIABACQAYAVACAnQACAHABAGAAADrQAIALAEARAg9DTQgJA5AiARQAbAOA4gOQAcgQgKg9AAADrQAPglAyAKAguBuIADAAIBUAFAgkCNQgUAdgEAeQgBAFAAAGQAqgHATAfAhmBwQASBAg1Az");
	this.shape_11.setTransform(-17.375,139.2788);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#D14955").s().p("AgmAkQgigRAJg4QAqgHAUAfQAHALAEAQQgEgQgHgLQAOglAyAKQAKA8gcAQQgcAHgUAAQgVAAgOgHg");
	this.shape_12.setTransform(-17.1788,164.1872);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#990000").s().p("Ag/AmIACgKQADgdAVgeQAEAIABAGQgBgHgFgLQgIgQABgLIBVAFIgGATIgFANIAGgMQAXAVADAmIADAOQgzgLgNAmQgVgggqAHg");
	this.shape_13.setTransform(-17.225,156.525);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#6B3F1B").s().p("AiAApQgLgIgEgSQgDgOAHgOQAHgOAKgFQAOgFAJAKQAMAGADARQACAKgCAKIgpAdIgDgEgAByAcIgngWIAAgDQgCgIACgJQAEgQAOgIQAMgJAOAEQAMAFAJAOQAIAPgFANQgDATgNAIIgEAEg");
	this.shape_14.setTransform(-15.9273,128.9527);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgxCSIAAgBIAAgCQACgJAIgHQAEgDAGgDQALgFAmgBQANAAADAFQACADAAAEIAAAJIgBAJIgBAGgAicADQgagIADg1QASgeASgTQAlgoAkAMQA2AkgiArQg5AVglAoQgHAAgFgCgAhxhjQgKAFgHAOQgHAPADAOQAEATALAIIADADIApgcQACgLgCgKQgDgRgMgHQgHgGgIAAIgIABgACEgdIgJgIIAJAGIAEgEQANgIADgSQAFgOgIgPQgJgOgMgFQgOgFgMAKQgOAHgEAQQgCAJACAKQgGgEgGgCQgdgsAvgjQAdgNAgAoQAOATAPAfQABAagEAPQgEAQgMAFQgEACgFAAQgKgMgKgLg");
	this.shape_15.setTransform(-16.8104,135.6262);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgkDRIgBgCQgJgSAAgKIAAgBIAAgBQABgKAJgIIACgCQAMgJAWgCIAegBQAJAAADAEQADAEAAAGIAAAIIgBAKQgDAOgFAMIgBgBIABABIgGAMIAFgNIAGgTIABgGIACgJIAAgJQAAgEgCgDQgEgFgNAAQglABgLAFQgGADgFADQgIAHgBAJIAAACIAAABIgDAAIADAAQgBALAIAQQAEALACAHQgCgGgEgIgAAkDLgAgrCygAjbhVIARgbQBtisBLBlIgBAoQgwgthCA+QgMAJgKAMQgTAWgWAegADDhxQgCgIgDgHQgmhfhdBFIAAgwQBdg+A9B8IAHAOIgXATIgCgGg");
	this.shape_16.setTransform(-17.375,132.4018);

	this.instance_9 = new lib.arrow();
	this.instance_9.setTransform(-161,511.75,0.2203,0.2475,-119.9849,0,0,-15.2,144.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(0.1,1,1).p("AA7jeQBdhGAmBgQADAGACAJQABACABAEIAXgTQgDgIgEgGQg9h8hdA9gADKhHQgJgUgHgQQgPgegPgTQgggogdAMQgWgHgOANACdgrQAFAAAEgBQAMgFAFgQQAEgQgBgaAjbiaQAJgOAIgNQBtirBLBlIgBAnQgwgshCA+QgMAJgKAMQgTAWgWAegAjAg7QAKgTAJgRQARgdATgTQAlgpAjANQAZgHASANAiLgfQgGAAgFgBQgbgJAEg2AiggFQAEgFAEgFQAGgIAHgIQAlgoA6gVQANgGANgDABZhjQgFgEgHgBQgKgHgMgDACdgrQgJgMgLgKQgEgFgEgEAgMgKQACADACACQAKAPALAEIABAAQACABACABQADgCADAAQALgHAMgRACvgPQgDgGgEgGQgFgIgGgIABNhoQgcgtAugjAgshcQAhgsg2gjABZBbQACAJABAIQAOBHAdAdAAjCFIABACQAYAVACAnQACAHABAGAAADrQAIALAEARAg9DTQgJA5AiARQAbAOA4gOQAcgQgKg9AAADrQAPglAyAKAguBuIADAAIBUAFAgkCNQgUAdgEAeQgBAFAAAGQAqgHATAfAhmBwQASBAg1Az");
	this.shape_17.setTransform(-17.375,139.2788);

	this.instance_10 = new lib.smoke();
	this.instance_10.setTransform(6.8,117.15,0.7051,0.6115,0,0,180,138.1,62.8);

	this.instance_11 = new lib.smoke();
	this.instance_11.setTransform(-92.35,104.35,0.6904,0.5596,0,0,0,57.5,49.9);

	this.instance_12 = new lib.teeth();
	this.instance_12.setTransform(-18.9,158.7,0.2614,0.3009,0,0,0,53.8,23.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(1,1,1).p("ADQhqQAzA7gzA2QATABAUADABLg4ICQhqIAAAzIgLAFIh8A5IBigqQASA5gxAYQg8AMgHgzIgCABIgwAWIAAhJIApArQAGgBABAAIAAABAjBhiIAbAMQgbA4AwAcQA3AMAKg6IAAAAIAzAWIAAhJIgrArIiXhqIAAAzIAeANQhHAsA0BLQBagNBNAYQAigggSgaAi/hxIgCAPAhIg4IgIAIAhIg4IArAeABPg0IADAEABUgxQgBgEgBgDQAAABgDADQgKAHgjATADQAHQhSgEhUAgQgegiAWgbABLg4IAEAEAimhWIBWAmAgjB9QAvBHArg/Aj2AbQARgEARgC");
	this.shape_18.setTransform(-17.8,132.113);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#6B3F1B").s().p("AiVArQgxgcAbg3IBWAmQgHAvgmAAQgJAAgKgCgABPgCIBigqQASA4gxAXQgMADgKAAQgoAAgFgog");
	this.shape_19.setTransform(-17.3264,127.4998);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AAlgEIApAqIADAEQgJAHgjATgAgaBEIgrgeIArgqIAABIgAhNAuIAIgIIArAegABRAqIgDgEIAFgBIAAAAIACAAIAAABIgEAEIAEgEIABAHIgBABgAhNAuIAAAAIhXgmIgagLIACgPIgCAPIgegNIAAgzICXBpIgIAIgABWAtIgBgHIAAgBIgCAAIAAAAIgFABICPhpIAAAzIgLAFIh8A4IAAAAgABVAmIAAAAg");
	this.shape_20.setTransform(-18.075,122.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAjAJIAwgWIABAAQAHAzA8gNQAxgYgSg4IhiAqIB8g5QAzA6gzA3QhRgFhUAhQgfgiAXgcgAjTA4Qg0hKBHgsIAaALQgaA3AwAcQA3AOAKg7IAAAAIAzAWQASAagiAhQhNgYhaAMg");
	this.shape_21.setTransform(-17.887,128.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.shape},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},44).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},76).to({state:[]},4).to({state:[{t:this.instance_6,p:{startPosition:0}}]},7).to({state:[{t:this.instance_6,p:{startPosition:54}}]},72).to({state:[{t:this.shape_1},{t:this.instance_7}]},27).to({state:[{t:this.shape_1},{t:this.shape_3},{t:this.shape_2}]},10).to({state:[{t:this.shape_5},{t:this.shape_1},{t:this.shape_4}]},2).to({state:[{t:this.shape_7},{t:this.shape_1},{t:this.shape_6}]},2).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_8}]},2).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_8}]},22).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_8}]},4).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_8}]},4).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_8}]},4).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_8}]},4).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_8}]},4).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_10}]},4).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_10}]},3).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_10}]},5).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_10}]},8).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_10}]},14).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_10}]},3).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_8}]},3).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_8}]},3).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_8}]},3).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_10}]},3).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_10}]},3).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_10}]},3).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_10}]},3).to({state:[{t:this.shape_9},{t:this.shape_1},{t:this.shape_10}]},3).to({state:[]},27).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.instance_8}]},33).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_17},{t:this.instance_8},{t:this.instance_9}]},18).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.instance_8},{t:this.instance_9},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10}]},129).wait(64));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_אנשים = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// אנשים
	this.instance = new lib.boycopy("synched",0);
	this.instance.setTransform(468.4,13.35,0.1224,0.1634,0,0,0,151.9,158.6);

	this.instance_1 = new lib.bubble();
	this.instance_1.setTransform(437.05,29.05,0.7679,0.6782,0,0,0,120.7,82);

	this.instance_2 = new lib.angryface();
	this.instance_2.setTransform(308.35,99.65,0.1183,0.106,0,0,0,120,140.1);

	this.instance_3 = new lib.girl1look();
	this.instance_3.setTransform(281.6,112.05,0.2045,0.2492,0,0,0,203.2,476.3);

	this.instance_4 = new lib.boy("synched",0);
	this.instance_4.setTransform(146.45,499.2,0.4483,0.4381,0,0,0,150.8,189.3);

	this.instance_5 = new lib.girl2("synched",0);
	this.instance_5.setTransform(478.7,505.65,0.4346,0.3405,0,0,0,127.4,218.5);

	this.instance_6 = new lib.faceidea();
	this.instance_6.setTransform(272.9,95.35,0.1149,0.1255,0,0,0,131.4,131);

	this.instance_7 = new lib.girlpountmove();
	this.instance_7.setTransform(282.05,110.05,0.1906,0.2015,0,0,0,212.5,288.4);

	this.instance_8 = new lib.fatman_1();
	this.instance_8.setTransform(-234.05,495.9,0.2906,0.2851,0,0,0,226.1,291.3);

	this.instance_9 = new lib.smile();
	this.instance_9.setTransform(270.25,104.4,0.0938,0.0985,0,0,0,163.2,181.2);

	this.instance_10 = new lib.girlshoot("synched",0);
	this.instance_10.setTransform(274.25,112.7,0.2309,0.232,0,0,0,149,230.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AgXAAIANgCAAYADIgHgB");
	this.shape.setTransform(276.625,149.9875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(0.1,1,1).p("AgMACIAZgD");
	this.shape_1.setTransform(276.8375,149.5625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2,1,1).p("ABKg2IhKA3Ig2AoIgTAOIBrAA");
	this.shape_2.setTransform(-27.375,125.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(0.1,1,1).p("AASmoIh8AnIg7ASIBxg6AClGqIgJgBABiGlIASgD");
	this.shape_3.setTransform(-22.2,167.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFFFFF").ss(0.1,1,1).p("AgSADIAkgF");
	this.shape_4.setTransform(-8.7,209.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5,p:{regX:127.4,regY:218.5,scaleX:0.4346,scaleY:0.3405,x:478.7,y:505.65}},{t:this.instance_4,p:{regX:150.8,regY:189.3,scaleX:0.4483,scaleY:0.4381,x:146.45,y:499.2}},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_5,p:{regX:127.4,regY:218.5,scaleX:0.4346,scaleY:0.3405,x:478.7,y:505.65}},{t:this.instance_4,p:{regX:150.8,regY:189.3,scaleX:0.4483,scaleY:0.4381,x:146.45,y:499.2}},{t:this.instance_7,p:{regX:212.5,regY:288.4,x:282.05,y:110.05}},{t:this.instance_6}]},120).to({state:[{t:this.instance_5,p:{regX:127.4,regY:218.5,scaleX:0.4346,scaleY:0.3405,x:478.7,y:505.65}},{t:this.instance_4,p:{regX:150.8,regY:189.3,scaleX:0.4483,scaleY:0.4381,x:146.45,y:499.2}},{t:this.instance_7,p:{regX:0,regY:0,x:241.55,y:51.95}},{t:this.instance_6}]},38).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_10,p:{regX:149,regY:230.4,scaleX:0.2309,scaleY:0.232,x:274.25,y:112.7}},{t:this.instance_9},{t:this.instance_5,p:{regX:130.2,regY:222.3,scaleX:0.4342,scaleY:0.3401,x:475.65,y:505.7}},{t:this.instance_4,p:{regX:153.6,regY:192.2,scaleX:0.4479,scaleY:0.4377,x:143.4,y:499.25}},{t:this.instance_8}]},45).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.instance_10,p:{regX:148.7,regY:231,scaleX:0.3288,scaleY:0.3752,x:-12.5,y:149.85}},{t:this.instance_5,p:{regX:130.2,regY:222.3,scaleX:0.4342,scaleY:0.3401,x:475.65,y:505.7}},{t:this.instance_4,p:{regX:153.6,regY:192.2,scaleX:0.4479,scaleY:0.4377,x:143.4,y:499.25}},{t:this.instance_8}]},206).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_4},{t:this.instance_10,p:{regX:148.7,regY:231,scaleX:0.3288,scaleY:0.3752,x:-12.5,y:149.85}},{t:this.instance_5,p:{regX:130.2,regY:222.3,scaleX:0.4342,scaleY:0.3401,x:475.65,y:505.7}},{t:this.instance_4,p:{regX:153.6,regY:192.2,scaleX:0.4479,scaleY:0.4377,x:143.4,y:499.25}},{t:this.instance_8}]},147).wait(64));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Layer_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_6
	this.instance = new lib.wistle();
	this.instance.setTransform(-238.95,493.85,0.1432,0.1178,0,0,180,109.7,78.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AAeggQALgDAJgDQBjgfA4AwAjMARQAEgFAFgEQBVhYBhAvQAJAEAHAFACGAAQAYACAcAGQAJABAIACAi1AzQAGgFAHgEQA7gmBbAJQAKAAAJACAA1ALQAIgDAJgDQAYgGAfAB");
	this.shape.setTransform(-239.95,446.1658);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#744516").ss(0.1,1,1).p("AAwgDIgxAaIgBABIAAgBAgvANIARgaIAfgJ");
	this.shape_1.setTransform(253.15,164.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(0.1,1,1).p("EAqhgXXIgGABEAqdgXYIAEABIADAAEAqagXWIABAAIACgCEAqAgXRQAAAAAAABQACADAAAEQAAACAAABIAAABIABAAIgBgEEAqFgXXIANADQACABAEgBIASADEAqCgXFIAAAAEAqFgXXIADAPIgFADEAqAgXRIACAMEAqYgXUIACgCIgVgBEAp+gXYIgBgHQAAADABAEIAAAAQAAACABABIABAEEAp+gXYIAAAAEApigXeQAQgFALAEIAgAHEAqUgWhIgJABIgIglEAqAgXQIgCgIEAp+gXYQgZgFgdALIAEgEEAmAgU0IAAAAIgDAPQgjAAgagRIASgIQAXAPAWgFQAAAAABAAIAAAAIANADEAmUgVtQAcASAngEIgVAPQgIACgHgBQgXgBgYgTgEgm7AVjQADACADACEgm7AVjQCWhJBiCDQACADABABIgSAAQhihjh/BAQiFhHhfBxIgSAAQBfibCPBWgEgnSAXEQAQgOgLghEgmNAWQQgKAhAdAMEgkFAW/QAYgHgGgXEgppAXiQgegBADgi");
	this.shape_2.setTransform(9.7,299.8011);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#079BF4").ss(0.1,1,1).p("AgIAFIABAEAAMgIIgXAI");
	this.shape_3.setTransform(280.5,151.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#744516").s().p("AgvANIARgbIAfgJQAYASAYACIgyAaIgBAAIAAAAIgLABQgRAAgRgLg");
	this.shape_4.setTransform(253.15,164.2469);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AjIAMQBWhYBhAvQAKAggPAOQhcgIg7AmQgegBADgigAh6gTQgFAFgBAGIAAAEIAAABIAAAAQAAAHAGAGQAGAGAIAAQAJAAAGgGQAGgGAAgIIAAAAIAAgDIAAgBIAAgBQgCgGgEgEQgGgGgJAAQgIAAgGAGgACCAFQAHgBAEgEQAGgGAAgJIAAAAIAAgEIAAgBQgCgGgEgEQgGgGgJAAQgIAAgGAGQgGAGAAAJIAAABIAAAAQAAAIAGAGQAEADAFABQgggBgYAHQgdgLAKghQBjgeA3AvQAFAWgXAHQgcgGgYgBg");
	this.shape_5.setTransform(-239.4834,445.7033);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#079BF4").s().p("AgNgGIANADIANADIgXAHg");
	this.shape_6.setTransform(280.35,150.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("EgowAXMQgFgFgBgIIAAgBIAAgBIAAgDQABgGAFgFQAGgGAJAAQAJAAAGAGQAEAEABAGIAAAAIAAABIABADIAAABQAAAIgGAGQgGAGgJAAQgJAAgGgGgEgk8AXHQgFgCgEgEQgFgFgBgIIAAgBIAAgBQAAgIAGgGQAGgGAJAAQAJAAAGAGQAEAEABAGIAAAAIABAEIAAABQAAAIgGAGQgFAFgHABIgDAAIgGAAgEgqiAW4QBficCPBXIAGAEIgGgEQCVhKBjCEIADAEIgSAAQhjhjh/BAQiEhIhgBygEAlGgUmIASgJQAXAPAWgEIABAAIgBAAIABAAIAAAAIgDAOIgBAAQgiAAgagQgEAmFgUkIAAAAgEAm5gU/QgXgCgYgSIAQgKQAcASAngFIgVAQIgLABIgEAAgEAo2gWFIgHgIQgIgMgBgFQgBgGACgFIAGgJIAGgJIgDAIIgCADIgCAGIAAACIgBADQgBAEABAEIABABIAEAHIAGAMIAAABQAEAGAFADQgEgBgFgFgEAqIgW5QAAgFgCgDIgCgHIgBgIIAgAIIgCACIgBAAIgVgBIADAOIgFADgEApSgXGQAFgDAFgCIAMgDQAQgGALAEIABAHIAAABQgZgFgdAKgEAqYgXEIgNgDIAVABIgCACIgDAAIgDAAgEAqLgXHg");
	this.shape_7.setTransform(9.0875,298.2636);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FAB7AE").s().p("AgiAgIgBAAIAAgBIgGgMIgFgHIAAAAIAAgFIgBgDIABgEIABgBIABgGIADgDIABAAQACgCACgGIACgCIAAgCIAAACIABgBQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAIAAAEIADgCIADAAIADgBIACAAIADgBIABgBIABgCIADgDQAcgLAZAFIAAADIABAEIACAMIgCgMIABABQABACAAAFIAAADIAAABIAAAAQABAGABADIABADIgDAFQgDADgDgCQgCgBAAgEIAAgKIgBAAIAAAAIAAAAIAAABQAAAEgCADQgHAHgHgFIgKAHIgIADIgKAGIgEAFIgBADIgCAFIgFACIgFABIgEAAIgFgBgAgXAEIAAAAIABAAIgBAAgAgigEIABAAIAAAAg");
	this.shape_8.setTransform(274.1274,153.3136);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#D14955").ss(2,1,1).p("AAzAAQAAAVgPAPQgPAPgVAAQgUAAgPgPQgPgPAAgVQAAgUAPgPQAPgPAUAAQAVAAAPAPQAPAPAAAUg");
	this.shape_9.setTransform(-234.025,488.775);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(1,1,1).p("AAegXQALgEAJgCQBEhEBXBVAjMAaQAEgFAFgEQBVh5BhBQQAJAEAHAFACGAJQAYACAcAGQAJABAIACAi1A8QAGgFAHgEQA7gmBbAJQAKAAAJACAA1AUQAIgDAJgDQAYgHAfAC");
	this.shape_10.setTransform(-239.95,445.271);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(0.1,1,1).p("EAqdgXYIAEABIADAAEAqhgXXIgGABEAqagXWIABAAIACgCEAqFgXXIANADQACABAEgBIACgCIgVgBIADAPIgFADIgBgEQAAACAAABIAAABIABAAEAqAgXRQAAAAAAABQACADAAAEEAqCgXFIAAAAEAqAgXRIACAMEAqYgXUIASADEAp+gXYIgBgHQAAADABAEIAAAAgEAp+gXYQAAACABABIABAEEApigXeQAQgFALAEIAgAHEAqUgWhIgJABIgIglEAqAgXQIgCgIEAp+gXYQgZgFgdALIAEgEEAmAgU0IAAAAIgDAPQgjAAgagRIASgIQAXAPAWgFQAAAAABAAIAAAAIANADEAmUgVtQAcASAngEIgVAPQgIACgHgBQgXgBgYgTgEgm6AVjIgBAAQADACADACEgm6AVjQAogaAggLQAggMAtASQAtASA1BHQACADABABIgSAAQhqh4h3BVQgEgDhCgiQhCgihcBxIgSAAQBfiTBLAnQBGAkgBADgEgkFAW/QAYgHgGgXEgmNAWQQgKAhAdAMEgnSAXEQAQgOgLghEgppAXiQgegBADgi");
	this.shape_11.setTransform(9.7,299.8011);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#990000").s().p("AgjAkQgPgPAAgVQAAgUAPgPQAPgPAUAAQAVAAAPAPQAPAPAAAUQAAAVgPAPQgPAPgVAAQgUAAgPgPg");
	this.shape_12.setTransform(-234.025,488.775);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AjIAVQBWh5BhBQQAKAggPAOQhcgIg7AmQgegBADgigAh6gKQgFAFgBAFIAAAEIAAABIAAAAQAAAIAGAGQAGAGAIAAQAJAAAGgGQAGgGAAgJIAAAAIAAgDIAAgBIAAAAQgCgGgEgEQgGgGgJAAQgIAAgGAGgACCAOQAHgBAEgFQAGgGAAgIIAAAAIAAgEIAAgBQgCgGgEgEQgGgGgJAAQgIAAgGAGQgGAGAAAJIAAABIAAAAQAAAHAGAGQAEAEAFABQgggBgYAHQgdgMAKggQBDhDBXBUQAFAWgXAHQgcgGgYgBg");
	this.shape_13.setTransform(-239.4834,444.8085);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("EgowAXMQgFgFgBgIIAAgBIAAgBIAAgDQABgGAFgFQAGgGAJAAQAJAAAGAGQAEAEABAGIAAAAIAAABIABADIAAABQAAAIgGAGQgGAGgJAAQgJAAgGgGgEgk8AXHQgFgCgEgEQgFgFgBgIIAAgBIAAgBQAAgIAGgGQAGgGAJAAQAJAAAGAGQAEAEABAGIAAAAIABAEIAAABQAAAIgGAGQgFAFgHABIgDAAIgGAAgEgqiAW4QBeiUBLAnQBGAlgBADIAAAAIAGAEIgGgEIAAAAQAogaAggMQAggLAtARQAtASA2BIIADAEIgSAAQhrh4h3BVQgEgDhCgjQhBgihdBygEAlGgUmIASgJQAXAPAWgEIABAAIgBAAIABAAIAAAAIgDAOIgBAAQgiAAgagQgEAmFgUkIAAAAgEAm5gU/QgXgCgYgSIAQgKQAcASAngFIgVAQIgLABIgEAAgEAo2gWFIgHgIQgIgMgBgFQgBgGACgFIAGgJIAGgJIgDAIIgCADIgCAGIAAACIgBADQgBAEABAEIABABIAEAHIAGAMIAAABQAEAGAFADQgEgBgFgFgEAqIgW5QAAgFgCgDIgCgHIgBgIIAgAIIgCACIgBAAIgVgBIADAOIgFADgEApSgXGQAFgDAFgCIAMgDQAQgGALAEIABAHIAAABQgZgFgdAKgEAqYgXEIgNgDIAVABIgCACIgDAAIgDAAg");
	this.shape_14.setTransform(9.0875,298.2636);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#D14955").ss(2,1,1).p("ABIAAQAAAcgWAUQgVAUgdAAQgdAAgVgUQgVgUAAgcQAAgcAVgUQAVgTAdAAQAdAAAVATQAWAUAAAcg");
	this.shape_15.setTransform(-233.975,488.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#FFFFFF").ss(0.1,1,1).p("AgOgDQAOANAPgK");
	this.shape_16.setTransform(-226.9375,445.7704);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(1,1,1).p("AjMAhQAEgFAFgEQBmiwBQCHQAJAEAHAFAAegQQALgDAJgDQA8hzBfCEACIAcQAPACARACQAKABAKADQAIABAIACAA5AmQAHgDAHgCQACgBABAAQADgBADgBQAHgCAIAAQAOgBASABAi0BMQAFgNAHgFICWgdQAKABAGAM");
	this.shape_17.setTransform(-239.95,444.5511);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(0.1,1,1).p("EAqdgXYIAEABIADAAEAqhgXXIgGABEAqagXWIABAAIACgCEAqFgXXIANADQACABAEgBIACgCIgVgBIADAPIgFADIgBgEQAAACAAABIAAABIABAAEAqAgXRQAAAAAAABQACADAAAEEAqCgXFIAAAAEAqAgXRIACAMEAqYgXUIASADEAp+gXYIgBgHQAAADABAEIAAAAgEAp+gXYQAAACABABIABAEEApigXeQAQgFALAEIAgAHEAqUgWhIgJABIgIglEAqAgXQIgCgIEAp+gXYQgZgFgdALIAEgEEAmAgU0IAAAAIgDAPQgjAAgagRIASgIQAXAPAWgFQAAAAABAAIAAAAIANADEAmUgVtQAcASAngEIgVAPQgIACgHgBQgXgBgYgTgEgm6AVjQAlgwAfgUQAfgUAvAlQAwAmA1BHQACADABABIgSAAQh8ijhlCAQgGgNhDgoQhCgohZCHIgSAAQBiizBIAyQBGAzgBAJIgBAAQADACADACEgkEAXLQAFgCAEgCQAMgUgEgSEgmNAWQQgJAfAbAYQABABACABEgnSAXEQAQgOgLghEgppAXiQgegBADgi");
	this.shape_18.setTransform(9.7,299.8011);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#990000").s().p("AgyAwQgVgVAAgbQAAgcAVgUQAVgSAdgBQAdABAVASQAWAUAAAcQAAAbgWAVQgVATgdAAQgdAAgVgTg");
	this.shape_19.setTransform(-233.975,488.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AjIAhQBmiwBRCHQAKAfgPAPIiXAdQgeAAADgigAh6ABQgFAFgBAGIAAAEIAAABIAAAAQAAAIAGAGQAGAGAIAAQAJAAAGgGQAGgGAAgJIAAAAIAAgEIAAAAIAAgBQgCgGgEgEQgGgFgJAAQgIAAgGAFgACjApQgSgPgNAMIgBAAQABAHgEgHQgEgHgCAGQgSgBgOABIgOACIgBAAIgLACQgcgYAKgeQA7hzBfCDQAEASgMAUIgJAEIgUgEgABwgJQgGAGAAAIIAAABIAAAAQAAAHAEAFQAPANAQgLIAAAAQAGgGAAgJIAAAAIAAgEIAAgBQgCgFgEgEQgGgGgJAAQgIAAgGAGgABAApIAGAAIgDACIgDgCg");
	this.shape_20.setTransform(-239.4783,443.6386);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("EgowAXMQgFgFgBgIIAAgBIAAgBIAAgDQABgGAFgFQAGgGAJAAQAJAAAGAGQAEAEABAGIAAAAIAAABIABADIAAABQAAAIgGAGQgGAGgJAAQgJAAgGgGgEglHAW/QgDgFgBgGIAAgBIAAgBQAAgIAGgGQAGgGAJAAQAJAAAGAGQAEAEABAGIAAAAIABAEIAAABQAAAIgGAGIgBABQgHAFgHAAQgIAAgJgIgEgqiAW4QBii0BHAzQBHAygCAKIAAAAIAGAEIgGgEIAAAAQAmgxAegUQAfgUAwAmQAvAlA2BIIADAEIgSAAQh9ikhlCBQgGgNhCgpQhDgohZCIgEAlGgUmIASgJQAXAPAWgEIABAAIgBAAIABAAIAAAAIgDAOIgBAAQgiAAgagQgEAmFgUkIAAAAgEAm5gU/QgXgCgYgSIAQgKQAcASAngFIgVAQIgLABIgEAAgEAo2gWFIgHgIQgIgMgBgFQgBgGACgFIAGgJIAGgJIgDAIIgCADIgCAGIAAACIgBADQgBAEABAEIABABIAEAHIAGAMIAAABQAEAGAFADQgEgBgFgFgEAqIgW5QAAgFgCgDIgCgHIgBgIIAgAIIgCACIgBAAIgVgBIADAOIgFADgEApSgXGQAFgDAFgCIAMgDQAQgGALAEIABAHIAAABQgZgFgdAKgEAqYgXEIgNgDIAVABIgCACIgDAAIgDAAg");
	this.shape_21.setTransform(9.0875,298.2636);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#D14955").ss(2,1,1).p("ABdAAQAAAngbAdQgcAcgmAAQgmAAgcgcQgagdAAgnQAAgnAagdQAcgcAmAAQAmAAAcAcQAbAdAAAng");
	this.shape_22.setTransform(-234,488.85);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#000000").ss(1,1,1).p("AjMAlQAEgFAFgEQBjjBBTCYQAJAEAHAFAAegMQALgDAJgDQBCiYBZCpACIAtIAAAAQAGABAGAAQAFABAFABQAFAAAEABQABAAAAAAIAAAAQAKACAKACIAAAAQAIACAIABABKAxQADgBACgBQABAAAAAAIAAAAIAAAAQAHgCAIAAQACAAACgBQAJAAAKAAQAFABAEAAAi2BbQACgGACgEQAEgFADgDQABAAAAAAIAHgBIB0gXIAbgGIABAAQAJABAGAMAA5A3QAHgDAHgC");
	this.shape_23.setTransform(-239.95,444.1513);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#000000").ss(0.1,1,1).p("EAqdgXdIAEAAIADABEAqhgXdIgGACEAqagXbIABAAIACgCEAqFgXcIANADQACAAAEAAIACgCIgVgBIADAOIgFADIgBgDQAAABAAABIAAABIABAAEAqAgXXQAAABAAAAQACADAAAFEAqCgXLIAAAAEAqAgXXIACAMEAqYgXZIASADEAp+gXdIgBgIQAAAEABADIAAABgEAp+gXdQAAABABACIABADEApigXjQAQgGALAEIAgAIEAqUgWmIgJAAIgIglEAqAgXWIgCgHEAp+gXdQgZgFgdAKIAEgDEAmAgU5IAAAAIgDAOQgjABgagRIASgJQAXAPAWgEQAAAAABAAIAAAAIANACEAmUgVyQAcASAngFIgVAQQgIABgHAAQgXgCgYgSgEgm6AVeQAmgzAjgcQAigbArAuQAsAuA1BIQACACABACIgSAAQh1jIhsClQgFgRhCgtQhBgthcCVIgSAAQBni/BFA3QBFA3gCAMIgBAAQADABADADEgkEAXTIABAAQAFgPADgCQAMgUgEgSEgmNAWLQgJAfAbAYIABAAQABACAEALEgnUAXKQAAAAAAgBQARgZgKggEgprAXnQAAAAAAAAQgcgMADgh");
	this.shape_24.setTransform(9.7,300.3636);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#990000").s().p("AhCBEQgagdAAgnQAAgnAagdQAcgcAmAAQAmAAAcAcQAbAdAAAnQAAAngbAdQgcAcgmABQgmgBgcgcg");
	this.shape_25.setTransform(-234,488.85);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AivBSQgcgMADgiQBkjABTCYQAKAfgRAZIAAABIgbAFIAbgGIAAAAIAAAAIgbAGIh1AWIgHACIAAAAIAAAAIAHgCIgHACIAAAAgAhdgKQgFAFgBAFIAAAAIAAAEIAAABIAAAAQAAAIAGAGQADADADABQAEACAEAAQAJAAAGgGQAGgGAAgJIAAAAIAAgDIAAgBIAAAAQgCgGgEgEQgGgGgJAAQgIAAgGAGgAC3A+IABAAIgBAAIAAAAgAC3A+QgKgQgJAMIgBAAIAAAAIgJgCIgLgBIgLgBIgBAAQAAAAAAAAQgBAAAAAAQAAAAgBgBQAAAAgBgBQgEgEgDAAQgDABgEAEIgTAAQgNgLgGAOIgBAAIAAAAIgGgGIABAIIAAAAIgFgNIgBAAQgcgZAKgeQBBiXBZCoQAEARgMAVQgEACgEAPgAB/AdQAGAAAGgEIAAAAIABgBIABAAIgBAAIgBABIAAAAQgGAEgGAAIAAAAIAAAAQgIAAgIgHIgBgBIABABQAIAHAIAAIAAAAIAAAAgABhgTQgGAGAAAJIAAABIAAAAQAAAGAEAFQAGAFAGABQAJADAKgHIAAAAQAGgGAAgIIAAAAIAAgEIAAgBIgBgCQgBgEgEgEQgGgGgJAAQgIAAgGAGgAC3A+gABgA2IgBgBIATAAQgFAFgFAAQgEAAgEgEgACjA6IAAAAIABAAIgBAAIAAAAgACkA6gABLA4IAAAAIABAAIgBAAIAAABgACJA3QgFAAAAgBIALABIAAAAIgGAAgAByA1IAAAAg");
	this.shape_26.setTransform(-239.4793,443.2763);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("EgoNAXJQgDgCgDgCQgFgGgBgIIAAAAIAAgBIABgEIAAAAQABgGAEgFQAGgGAJAAQAJAAAGAGQAEAEABAGIAAABIABABIAAADIAAAAQAAAJgGAGQgGAGgJAAQgFAAgEgCgEglKAXAQgGgBgFgFQgEgFgBgHIAAAAIAAgBQAAgJAGgGQAGgGAJAAQAJAAAGAGQADADACAFIAAACIAAABIABAEIAAAAQAAAJgGAGIgBAAQgHAFgHAAIgFgBgEgqiAXAQBmi/BFA3QBGA3gDALIAAABIAGAEIgGgEIAAgBQAngyAigcQAigcAsAvQArAuA2BIIADAEIgSAAQh2jIhsClQgFgRhBgtQhCgthcCVgEAlGgUeIASgJQAXAPAWgFIABABIgBgBIABAAIAAABIgDAOIgBAAQgiAAgagQgEAmFgUdIAAAAgEAm5gU4QgXgBgYgSIAQgKQAcARAngEIgVAQIgLABIgEgBgEAo2gV9IgHgIQgIgMgBgFQgBgGACgFIAGgJIAGgJIgDAIIgCACIgCAHIAAACIgBADQgBAEABAEIABABIAEAHIAGAMIAAAAQAEAHAFADQgEgBgFgFgEAqIgWxQAAgFgCgDIgCgHIgBgIIAgAHIgCACIgBABIgVgBIADAOIgFADgEApSgW+QAFgDAFgCIAMgDQAQgGALAEIABAHIAAABQgZgFgdAKgEAqYgW8IgNgDIAVABIgCACIgDAAIgDAAg");
	this.shape_27.setTransform(9.0875,297.4886);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#D14955").ss(2,1,1).p("ACDAAQAAAagIAWQgKAbgVAVQgmApg2AAQg2AAgmgpQgUgVgKgbQgIgWAAgaQAAg4AmgoQAmgoA2AAQA2AAAmAoQAnAoAAA4g");
	this.shape_28.setTransform(-233.975,488.875);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#000000").ss(0.1,1,1).p("EAqogX5IADAAIADABEAqrgX5IgGACEAqlgX3IAAAAIADgCEAqPgX4IANADQADAAADAAIADgCIgWgBIADAOIgFADIgBgDQAAABAAABIAAABIABAAEAqKgXzQAAABAAAAQACADAAAFEAqMgXnIAAAAEAqKgXzIACAMEAqigX1IASADEAqJgX5IgCgIQAAAEABADIAAABgEAqIgX5QABABAAACIABADEApsgX/QAQgGALAEIAhAIEAqegXCIgJAAIgIglEAqKgXyIgBgHEAqIgX5QgZgFgdAKIAEgDEAmKgVVIAAAAIgDAOQgiABgbgRIASgJQAXAPAWgEQABAAAAAAIABAAIAMACEAmegWOQAdASAmgFIgVAQQgIABgHAAQgXgCgYgSgEgmwAVCQAngzAigcQAigbAsAuQArAuA2BIQABACACACIgSAAQh2jIhsClQgFgRhBgtQhCgthcCVIgRAAQBmi/BFA3QBGA3gDAMIAAAAQADABADADEgiWAXbQAAgLgDgFQAAgBgBAAQgGgLgSAAEgi9AWlQAFgFAFgBQAIgBAIAHEgj5AW3IAAAAQAFgPAEgCQAMgUgEgSEgi2AXsIgPgfEgmDAVvQgJAfAcAYIAAAAQABACAEALEgnKAWuQAAAAABgBQARgZgLggEgpgAXLQAAAAgBAAQgcgMAEghEgqMAW8QgFgEgFgBQgBAAAAAAQgIgBgHAGEgqTAYDIAQghEgqzAXyQAAgBAAgCQABgJADgFQAGgLASAB");
	this.shape_29.setTransform(8.6735,303.1636);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#990000").s().p("AhcBgQgUgVgKgbQgIgWAAgaQAAg4AmgoQAmgoA2AAQA2AAAmAoQAnAoAAA4QAAAagIAWQgKAbgVAVQgmApg2AAQg2AAgmgpg");
	this.shape_30.setTransform(-233.975,488.875);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AivBSQgcgMADgiQBkjABTCYQAKAfgRAZIAAABIgbAFIAbgGIAAAAIAAAAIgbAGIh1AWIgHACIAAAAIAAAAIAHgCIgHACIAAAAgAhHgPIgCACQgFAFgBAGIAAABIAAACIAAABIAAAAQAAAIAGAGQADADADABIABAAIAHACQAJAAAGgGQAGgGAAgJIAAAAIAAgCIAAgBIAAgBQgCgGgEgEQgGgGgJAAQgHAAgFAEgAC3A+IABAAIgBAAIAAAAgAC3A+QgKgQgJAMIgBAAIAAAAIgJgCIgLgBIgLgBIgBAAQAAAAAAAAQgBAAAAAAQAAAAgBgBQAAAAgBgBQgEgEgDAAQgDABgEAEIgTAAQgNgLgGAOIgBAAIAAAAIgGgGIABAIIAAAAIgFgNIgBAAQgcgZAKgeQBBiXBZCoQAEARgMAVQgEACgEAPgAB/AdQAGAAAGgEIAAAAIABgBIABAAIgBAAIgBABIAAAAQgGAEgGAAIAAAAIAAAAQgIAAgIgHIgBgBIABABQAIAHAIAAIAAAAIAAAAgABPgYQgGAGAAAJIAAABIAAAAQAAAHAEAEQAGAFAGACQAEABAFgBQAFgBAFgEIAAAAQAGgFAAgJIAAAAIAAgEIAAgBIgBgCQgBgEgEgEIAAgBQgGgFgJAAQgIAAgGAGgAC3A+gABgA2IgBgBIATAAQgFAFgFAAQgEAAgEgEgACjA6IAAAAIABAAIgBAAIAAAAgACkA6gABLA4IAAAAIABAAIgBAAIAAABgACJA3QgFAAAAgBIALABIAAAAIgGAAgAByA1IAAAAg");
	this.shape_31.setTransform(-239.4793,443.2763);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("Egn3AXIIgBAAQgEgCgDgDQgFgFgBgIIAAgBIAAgBIABgDIAAAAQABgHAEgEIACgCQAFgEAIAAQAJAAAGAGQAEAEABAGIAAAAIABABIAAADIAAABQAAAIgGAGQgGAGgJAAIgHgBgEgqiAXBQBmi+BFA2QBGA3gDAMIAAAAIAGAEIgGgEIAAAAQAngzAigcQAigbAsAuQArAuA2BIIADAEIgSAAQh2jHhsCkQgFgQhBgtQhCgthcCUgEglcAW9QgGgCgFgFQgEgFgBgGIAAgBIAAgBQAAgIAGgGQAGgGAJAAQAIAAAGAFIABABQADADACAFIAAACIAAAAIABAEIAAABQAAAIgGAGIgBABQgFADgFABIgEABIgFgBgEAlGgUdIASgIQAXAPAWgFIABAAIgBAAIABAAIAAAAIgDAPIgBAAQgiAAgagRgEAmFgUbIAAAAgEAm5gU2QgXgCgYgSIAQgKQAcASAngEIgVAPIgLABIgEAAgEAo2gV7IgHgJQgIgMgBgEQgBgGACgGIAGgIIAGgJIgDAHIgCADIgCAGIAAACIgBAEQgBADABAFIABAAIAEAHIAGAMIAAABQAEAGAFADQgEAAgFgFgEAqIgWwQAAgFgCgDIgCgHIgBgHIAgAHIgCACIgBAAIgVgBIADAPIgFACgEApSgW9QAFgDAFgBIAMgEQAQgFALAEIABAHIAAAAQgZgFgdALgEAqYgW7IgNgDIAVABIgCACIgDAAIgDAAg");
	this.shape_32.setTransform(9.0875,297.3386);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#D14955").ss(1,1,1).p("AAph7IgEgBIgBAAIgIgBAArh7QgBAAgBgBIgFgCIgHgDAhHhpIAKgFAhJhnIACgCIAKgIIAGgGAA0B8IAGgEIAAAAIAIgEABECCIAGgH");
	this.shape_33.setTransform(-234.125,488.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#D14955").ss(0.1,1,1).p("AgRh9IAAAAIAAgBIAAgBAgUh7IADABIAFACIACABAgUh7IADAAIAHgBIgCAAIgFAAAgZh+IAFADAgRiAIAFABAgUiBIAKAAIgIAAAgRiAIADACAgRh7IAFADAAUB5IAGgDIgFgDIgHgFIgEACAAGByIgBAAAAEB2IAAABAADB4IABgBIAAAAIAAgBIABAAAAEB+IAAAEIAEgCAAHB+IABACIAGAA");
	this.shape_34.setTransform(-228.6875,488.6);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#000000").ss(0.1,1,1).p("ABGh+IAAgBIAAAAIAAAAAAjh7IAAAfIAjABIAAgdIAAgCIAAAAIAAgBIAAgBAgbhzIAAACIAAADIABAXIAfAQIAAgwABUBoIAAABIABABIAIAKIABAAABSBfQACAFABAGABSBfQABAFABAEABDCAIgMgdIAdAFAgdBwIAAAAAgdBvIAVgRIAMAAIACAiAhdgSQCUgFAbB2");
	this.shape_35.setTransform(-237.525,488.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#D14955").ss(2,1,1).p("AADiIQANABAMACQACABACAAQABAAABABQAAAAABAAQACABADAAQAdAKAXAYQAnAoAAA4QAAAagIAWQgKAbgVAVQgHAIgHAGQgCABgCACQgDACgEADAgZiFIAAAAQAJgCALgBAhOBtQgIgGgGgHQgUgVgKgbQgIgWAAgaQAAgLACgKQADgcAOgXQAIgNALgLQANgOAQgJQADgCADgCQALgFAMgDAA5B8QgDABgDABQgGADgHACAAgCFQgCAAgCABAgaCGQgBAAgBAAAAaCGQgNADgNAAQgMAAgMgDAgdCGQgWgGgTgN");
	this.shape_36.setTransform(-233.975,488.875);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#D14955").s().p("AADADQABgBAAAAQAAgBAAAAQAAgBAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAQgBAAAAAAQAAAAAAABIgCAAQAAAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAIgBAAIgBAAQADgCADAAIgCAAIADgCIAHAEIgHAFgAgGAAIAAAAIAAAAgAgHAAIABAAIgBAAg");
	this.shape_37.setTransform(-227.3625,500.1375);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFF99").s().p("AAkCKIABgCIAAgBIAAAAIAAAAIgEACIgCAAIgBAAIgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAAAAAgBIADgDIAFgDIgCABIABgBIABgBIgMgeIAdAHIAAAAIABABIAJAJIAAABIAAgBIABgBIAEgBIABAAQgDAAgCADIAAAAIACgBQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAAAIACgBQABAAAAAAQAAgBABAAQAAAAAAABQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAABQgBABAAABIgCABIgDADIABAAIgCABIgBAAIAAAAIgCACIgBAAIgCAAIgBAAIAAgBQAAAAAAAAQgBAAAAgBQAAAAABAAQAAgBAAAAIABgCIgBAAIAAgBIABgBIAAAAIAAAAIAAAAIgBAAIgGAEIABAGIgNAFIAAAAIgBAAIACAAIgDABIgCABIAAABIgBABIADgBIgDABIgBAAIgBAAgAA+B3IAHgEgAA/B0IABgBIgBAAgAgVCKIgBgBIgBgCIgBACIAAAAIABABIgBAAIgBgBIAAgBQgWgFgTgNIAAABIgBAAIgBAAIgDABIAAgCIADgCIgEgCQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAIABAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAAAIAGACIABAAIgDgBIAFAAIACgBIAAAAIAVgRIANAAIACAgQAAAAABABQAAAAAAAAQAAAAAAAAQAAABAAAAIAAACIABABIACAEIABACIAAAAIgBABgAg8BvIAAAAIAAAAgAg5hYIgBgXIAAgDIAGgGIgGAGIAAgDIAGgDQALgFALgEIgBAAQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAIACAAIAGgEIgDAEIACgBIACABIAAAAQABAAAAAAQAAAAABAAQAAAAgBAAQAAABAAAAIgBABIAAABQAAABgBABQAAAAAAAAQgBABAAAAQAAAAgBAAIABADIgCABIAAAwgAAEhdIAAgfIgEgBIgBgCQAAAAAAgBQgBAAABgBQAAAAAAgBQAAAAAAAAIABgBIgBgBIAAgBQAAAAABAAQAAgBAAAAQAAAAAAAAQAAAAAAAAIADAAIgBgEIABACIABABIABAAIACABIAAABQANAAAMADIAFABIABAAIABABIAAAAIAAAAIAAABIgHgDIAHADIAAABIAAABIABAAIgBgBIAAgBIAFACIgCAAIgCAAIAAAAIgBAAIAAAAIAAAAIgHgBIAHABIAAABIAAABIgDABIgEgEIAEAEIADABIAAAdgAAnh5gAAkh6IADgBIAAABIAAABgAAnh7gAAsh9IgFgCIADABQABAAABAAQAAAAABABQAAAAABAAQAAABAAAAIgCgBgAAnh/g");
	this.shape_38.setTransform(-234.4378,488.6);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#DE7E72").s().p("AAQBNIABAAIgBgBIgDgEIAAgCIAAgCQAAAAAAgBQAAAAAAAAQgBAAAAAAQAAAAgBAAIgCghIgLAAIgVARIgBAAIgCABIgEAAIADABIgBAAIgGgCQAAAAgBAAQAAAAgBAAQAAAAAAAAQAAAAAAABIgBAAIgOgNQgUgVgJgaQgJgXAAgaQABgLABgKQCUgGAbB2IACAKIgdgGIALAdIAAABIgBABIABgBIgEADIgDADQAAABAAAAQAAAAAAABQAAAAAAABQAAAAAAAAIACAAQgNADgOAAQgMAAgMgDgAAMBNIAAgCIACACIgCAAgABKBLIgBAAIAAABIgEABgAgYAzIABAAIgBAAg");
	this.shape_39.setTransform(-238.1,494.5878);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#990000").s().p("AAyB9IAGgDIABgBIAAAAIAAAAIAAAAIAAAAIgBABIAAAAIAAAAIAAABIABABIgBACQgBAAAAAAQAAABAAAAQAAAAAAABQAAAAABAAIAAABIgGACIAAgGgAA4B6IAAAAIAAAAgAA5B5gABCBxIgEACIgDABIgBABIgBAAIgJgKIgCgLQgbh1iUAFQAEgbANgXQAIgNALgMQAOgOAPgJIAAACIABADIABAYIAgAQIgBgxIACgBIAAgCQAAAAABgBQAAAAAAAAQABAAAAgBQAAAAABgBIAAgBIABgBQAAgBAAAAQAAAAAAgBQAAAAAAAAQgBAAAAAAQAKgCAKAAIAAAAIABACIgBABQAAAAgBAAQAAAAAAABQAAAAAAABQAAAAABABIACACIADABIAAAfIAjABIAAgeIAAgBIAAAAIAAgBIAAgBIAAAAIAFABIgFgBIABgBIACABIACAAIACABQAAgBgBAAQAAgBgBAAQAAAAgBAAQAAAAgBAAIgDgCIADACIgDgBIAAgBIAAAAIAAgBIAFACQAdAJAYAYQAmAoAAA4QAAAagIAXQgKAagUAWIgPANIgDADgAhJhoIgDACIADgCIAKgFIgKAFIAJgIIgJAIgAAph0IgCgBgAAnh1IgFgDIAFADIgFgCIAFACgAAih4IAHgBIgCAAIgFAAIAFAAIACAAgAAnh8IgFgBgAAwBrIAAgBIgCgKIACALgAhJhogAAnh1gAAih7IABAAIgBABg");
	this.shape_40.setTransform(-233.9,488.3375);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AivBSQgcgMADgiQBkjABTCYQAKAfgRAZIAAABIgbAFIAbgGIAAAAIAAAAIgbAGIh1AWIgHACIAAAAIAAAAIAHgCIgHACIAAAAgAgwgQIgDACIgCABQgFAFgBAGIAAABIAAACIAAABIAAAAQAAAIAGAGIAFADIABABIABABIAHABQAJAAAGgGQAGgGAAgJIAAAAIAAgCIAAgBIAAgBQgCgGgEgEQgGgGgJAAQgFAAgEADgAC3A+IABAAIgBAAIAAAAgAC3A+QgKgQgJAMIgBAAIAAAAIgJgCIgLgBIgLgBIgBAAQAAAAAAAAQgBAAAAAAQAAAAgBgBQAAAAgBgBQgEgEgDAAQgDABgEAEIgTAAQgNgLgGAOIgBAAIAAAAIgGgGIABAIIAAAAIgFgNIgBAAQgcgZAKgeQBBiXBZCoQAEARgMAVQgEACgEAPgAB/AdQAGAAAGgEIAAAAIABgBIABAAIgBAAIgBABIAAAAQgGAEgGAAIAAAAIAAAAQgIAAgIgHIgBgBIABABQAIAHAIAAIAAAAIAAAAgAA7gXQgGAGAAAIIAAABIAAABQAAAGAEAEQAGAFAGACQAEABAFAAIAHgDIADgCIAAgBQAGgFAAgIIAAgBIAAgEIAAAAIgBgCQgBgFgEgDIAAgBIgFgDQgEgCgGAAQgIAAgGAGgAC3A+gABgA2IgBgBIATAAQgFAFgFAAQgEAAgEgEgACjA6IAAAAIABAAIgBAAIAAAAgACkA6gABLA4IAAAAIABAAIgBAAIAAABgACJA3QgFAAAAgBIALABIAAAAIgGAAgAByA1IAAAAg");
	this.shape_41.setTransform(-239.4793,443.2763);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("EgnjAXIIgBAAIgCgBIgFgEQgFgFgBgIIAAgBIAAgBIABgDIAAAAQABgHAEgEIACgCIADgCQAEgCAGAAQAJAAAGAGQAEAEABAGIAAAAIABABIAAADIAAABQAAAIgGAGQgGAGgJAAIgHgBgEgqiAXBQBmi+BFA2QBGA3gDAMIAAAAIAGAEIgGgEIAAAAQAngzAigcQAigbAsAuQArAuA2BIIADAEIgSAAQh2jHhsCkQgFgQhBgtQhCgthcCUgEglwAW+QgGgCgFgFQgEgFgBgHIAAAAIAAgBQAAgJAGgGQAGgGAJAAQAFAAAEACIAFAEIABAAQADAEACAEIAAACIAAABIABAEIAAAAQAAAJgGAGIgBAAIgDACIgGADIgEAAIgGAAgEAlGgUdIASgIQAXAPAWgFIABAAIgBAAIABAAIAAAAIgDAPIgBAAQgiAAgagRgEAmFgUbIAAAAgEAm5gU2QgXgCgYgSIAQgKQAcASAngEIgVAPIgLABIgEAAgEAo2gV7IgHgJQgIgMgBgEQgBgGACgGIAGgIIAGgJIgDAHIgCADIgCAGIAAACIgBAEQgBADABAFIABAAIAEAHIAGAMIAAABQAEAGAFADQgEAAgFgFgEAqIgWwQAAgFgCgDIgCgHIgBgHIAgAHIgCACIgBAAIgVgBIADAPIgFACgEApSgW9QAFgDAFgBIAMgEQAQgFALAEIABAHIAAAAQgZgFgdALgEAqYgW7IgNgDIAVABIgCACIgDAAIgDAAg");
	this.shape_42.setTransform(9.0875,297.3386);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#000000").ss(1,1,1).p("AjMAlQAEgFAFgEQBfi5BRCFQABACABACQACADACAEQAJAEAHAFAAegMQALgDAJgDQABgBAAgBAA7glQA/h5BTCdACIAtIAAAAQAGABAGAAQAFABAFABQAFAAAEABQABAAAAAAIAAAAQAKACAKACIAAAAQAIACAIABABKAxQADgBACgBQABAAAAAAIAAAAIAAAAQAHgCAIAAQACAAACgBQAJAAAKAAQAFABAEAAAi2BbQACgGACgEQAEgFADgDQABAAAAAAIAHgBIB0gXIAbgGIABAAQAJABAGAMAA5A3QAHgDAHgC");
	this.shape_43.setTransform(-239.95,444.1515);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#079BF4").ss(0.1,1,1).p("AgMAIIACAHAARgOIghAN");
	this.shape_44.setTransform(-3.525,213.05);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#000000").ss(0.1,1,1).p("ATszVIAvAMIAEAAIgIADIgfgCIASAFQAEAAAFAAIAEgDIAEgDATuzJIABAAIgDgMQABAFABAGIAAABQgjgIgqARIAGgGAUTzDIAZAFAUfzJIAFABATwzEIAAAFIAAAAQAAABABABIgBgHIgBgFAT4zIIAEAYIgHAFATwy/IAEASIAAACAT0yxQAAACAAACIAAACIABAAgATxy9QACAEABAIAUNxwIgMAAIgMg7ATGzTQAXgJAPAHATuzJQABACABADAQAwGIgeAZAwoQXQAmgyAjgcQAigcArAvQAsAuA1BIQACACABACIgSAAQh1jIhsClQgFgRhCgtQhBgthcCVIgSAAQBmi/BGA3QBFA3gCALIgBABQADABADADAsPSxQABgLgEgFQAAgBAAAAQgHgLgRAAAs2R7QAFgFAGgBQAIgBAIAHAtySNIABAAQAEgPAEgCQAMgVgEgRAsvTCIgPgfAxCSEQAAgBAAAAQARgZgKggAv7REQgKAfAcAZIABAAQABACAEALAzZShQAAAAAAAAQgcgMADgiA0ESSQgFgEgGgBQAAAAgBgBQgHAAgIAGA0LTZIAQghA0rTIQAAgCAAgBQAAgJADgFQAHgLARAB");
	this.shape_45.setTransform(-132.8765,332.9842);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#DE7E72").s().p("AAQBNIABAAIgBgBIgDgEIAAgCIAAgCQAAAAAAgBQAAAAAAAAQgBAAAAAAQAAAAgBAAIgCghIgLAAIgVARIgBAAIABAAIgBAAIAAAAIgCABIgEAAIADABIgBAAIgGgCQAAAAgBAAQAAAAgBAAQAAAAAAAAQAAAAAAABIgBAAIgOgNQgUgVgJgaQgJgXAAgaQABgLABgKQCUgGAbB2IACAKIgdgGIALAdIAAABIgBABIABgBIgEADIgDADQAAABAAAAQAAAAAAABQAAAAAAABQAAAAAAAAIACAAQgNADgOAAQgMAAgMgDgAAMBNIAAgCIACACIgCAAgABKBLIgBAAIAAABIgEABg");
	this.shape_46.setTransform(-238.1,494.5878);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#990000").s().p("AAyB9IAGgDIABgBIAAAAIAAAAIAAAAIAAAAIgBABIAAAAIAAAAIAAABIABABIgBACQgBAAAAAAQAAABAAAAQAAAAAAABQAAAAABAAIAAABIgGACIAAgGgAA4B6IAAAAIAAAAgAA5B5gABCBxIgEACIgDABIgBABIgBAAIgJgKIgCgLQgbh1iUAFQAEgbANgXQAIgNALgMQAOgOAPgJIAAACIABADIABAYIAgAQIgBgxIACgBIAAgCQAAAAABgBQAAAAAAAAQABAAAAgBQAAAAABgBIAAgBIABgBQAAgBAAAAQAAAAAAgBQAAAAAAAAQgBAAAAAAQAKgCAKAAIAAAAIABACIgBABQAAAAgBAAQAAAAAAABQAAAAAAABQAAAAABABIACACIADABIAAAfIAjABIAAgeIAAgBIAAAAIAAgBIAAgBIAAAAIAFABIgFgBIABgBIACABIACAAIACABQAAgBgBAAQAAgBgBAAQAAAAgBAAQAAAAgBAAIgDgCIADACIgDgBIAAgBIAAAAIAAgBIAFACQAdAJAYAYQAmAoAAA4QAAAagIAXQgKAagUAWIgPANIgDADgAhMhmIADgCgAhJhoIAKgFIgKAFIAJgIgAAph0IgCgBgAAnh1IgFgDIAFADIgFgCIAFACgAAih4IAHgBIgCAAIgFAAIAFAAIACAAgAAnh8IgFgBgAAwBrIAAgBIgCgKIACALgAAnh1gAAih7IABAAIgBABg");
	this.shape_47.setTransform(-233.9,488.3375);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFF99").s().p("AAkCKIABgCIAAgBIAAAAIAAAAIgEACIgCAAIgBAAIgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAAAAAgBIADgDIAFgDIgCABIABgBIABgBIgMgeIAdAHIAAAAIABABIAJAJIAAABIAAgBIABgBIAEgBIABAAQgDAAgCADIAAAAIACgBQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAAAIACgBQABAAAAAAQAAgBABAAQAAAAAAABQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAABQgBABAAABIgCABIgDADIABAAIgCABIgBAAIAAAAIgCACIgBAAIgCAAIgBAAIAAgBQAAAAAAAAQgBAAAAgBQAAAAABAAQAAgBAAAAIABgCIgBAAIAAgBIABgBIAAAAIAAAAIAAAAIgBAAIgGAEIABAGIgNAFIAAAAIgBAAIACAAIgDABIgCABIAAABIgBABIADgBIgDABIgBAAIgBAAgAA+B3IAHgEgAA/B0IABgBIgBAAgAgVCKIgBgBIgBgCIgBACIAAAAIABABIgBAAIgBgBIAAgBQgWgFgTgNIAAABIgBAAIgBAAIgDABIAAgCIADgCIgEgCQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAIABAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAAAIAGACIABAAIgDgBIAFAAIACgBIAAAAIAAAAIAAAAIAAAAIAVgRIANAAIACAgQAAAAABABQAAAAAAAAQAAAAAAAAQAAABAAAAIAAACIABABIACAEIABACIAAAAIgBABgAg5hYIgBgXIAAgDIAGgGIgGAGIAAgDIAGgDQALgFALgEIgBAAQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAIACAAIAGgEIgDAEIACgBIACABIAAAAQABAAAAAAQAAAAABAAQAAAAgBAAQAAABAAAAIgBABIAAABQAAABgBABQAAAAAAAAQgBABAAAAQAAAAgBAAIABADIgCABIAAAwgAAEhdIAAgfIgEgBIgBgCQAAAAAAgBQgBAAABgBQAAAAAAgBQAAAAAAAAIABgBIgBgBIAAgBQAAAAABAAQAAgBAAAAQAAAAAAAAQAAAAAAAAIADAAIgBgEIABACIABABIABAAIACABIAAABQANAAAMADIAFABIABAAIABABIAAAAIAAAAIAAABIgHgDIAHADIAAABIAAABIAAAAIgHgBIAHABIAAABIAAABIgDABIgEgEIAEAEIADABIAAAdgAAnh5gAAkh6IADgBIAAABIAAABgAAnh7gAAsh9IgFgCIADABQABAAABAAQAAAAABABQAAAAABAAQAAABAAAAIgCgBgAAqh9IgCAAIAAAAIgBAAIAAAAIABAAIgBgBIAAgBIAFACIgCAAgAAnh9gAAnh/g");
	this.shape_48.setTransform(-234.4378,488.6);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AivBSQgcgMADgiQBgi5BQCFIgDgEQgJgIgMAAQgHAAgHADIgEADIgDACQgGAGgBAJIAAABIgBAEIAAAAIAAABQABALAHAIIAHAFIADABIABABQAEABAGAAQAMAAAJgIIADgEQAGgGAAgJIAAAAIAAgCIAAgBIAAgBIgBgDIAAAAIgCgGIAEAIQAKAfgRAZIAAABIgbAFIAbgGIAAAAIAAAAIgbAGIh1AWIgHACIAAAAIAAAAIAHgCIgHACIAAAAgAC3A+IABAAIgBAAIAAAAgAC3A+QgKgQgJAMIgBAAIAAAAIgJgCIgLgBIgLgBIgBAAQAAAAAAAAQgBAAAAAAQAAAAgBgBQAAAAgBgBQgEgEgDAAQgDABgEAEIgTAAQgNgLgGAOIgBAAIAAAAIgGgGIABAIIAAAAIgFgNIgBAAQgcgZAKgeIAAgBIAAADIAAABIAAABQABAIAFAHQAIAGAHADQAGABAHAAIAIgEIAEgDIABgBQAIgIAAgLIAAAAIgBgGIAAAAIgBgDQgCgGgEgFIgBgBIgGgEQgGgDgHAAQgKAAgIAHQA+h5BTCdQAEARgMAVQgEACgEAPgAB/AdQAGAAAGgEIAAAAIABgBIABAAIgBAAIgBABIAAAAQgGAEgGAAIAAAAIAAAAQgIAAgIgHIgBgBIABABQAIAHAIAAIAAAAIAAAAgAC3A+gABgA2IgBgBIATAAQgFAFgFAAQgEAAgEgEgACjA6IAAAAIABAAIgBAAIAAAAgACkA6gABLA4IAAAAIABAAIgBAAIAAABgACJA3QgFAAAAgBIALABIAAAAIgGAAgAByA1IAAAAg");
	this.shape_49.setTransform(-239.4793,443.2765);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FAB7AE").s().p("AgxA0IgBAAIgBgBIgIgUIgHgLIAAgBQgBgEABgEQAAgBAAgBQAAAAAAgBQAAAAAAgBQgBAAAAgBIABgGIACgCQAAgHACgDQAAgCADgCIACgBQADgDACgJIADgEIAAgCIAAACIACgBQABAAAAAAQABAAABABQAAAAAAABQAAAAAAABIAAAGIAFgDIAFAAIADgBIAEgBIADgCIACgBIABgDIAEgFQApgRAjAIIACAFIAAAFIAAABIABABQACAEABAIIAAAEIAAABIgEgSIAEASIAAABQAAAJABAGIACAFIgEAIQgEAFgEgEQgEgBAAgHIAAgRIgBAAIAAABIAAACQAAAGgDAFQgJALgLgHIgOALIgMAFIgOAKIgGAHIgCAFQAAADgCAFQgFADgCAAIgIACIgFABIgHgCg");
	this.shape_50.setTransform(-12.595,215.4664);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#079BF4").s().p("AgSgLIASAFIATAGIghAMg");
	this.shape_51.setTransform(-3.725,211.675);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AxmShIgBgBIgDgBIgGgFQgIgIAAgLIAAgBIAAgBIAAgEIAAgBQABgJAHgGIACgCIAEgDQAHgDAHAAQAMAAAJAIIAEAEIACAEIACAGIAAAAIAAABIAAABIAAAEIAAABQAAAJgEAHIgEAEQgJAIgMAAQgFAAgFgBgAvnSYQgIgDgIgGQgEgHgBgJIAAgBIAAgBIAAgDQAAgKAHgHIABgBQAIgHALAAQAHAAAFADIAHAEIAAABQAFAFABAGIACADIAAAAIAAAGIAAAAQAAAMgIAIIAAABIgFADIgIAEIgEAAIgIgBgA0ZSUQBni/BFA3QBFA3gCALIgBABIAGAEIgGgEIABgBQAmgyAjgcQAigcArAvQAsAuA1BIIADAEIgSAAQh1jIhsClQgFgRhCgtQhBgthcCVgAR9wlIgJgOQgMgTgCgIQgBgJADgJIAIgOIAIgPIgCANQgDACgBACQgCADAAAHIgCADIgBAGQgCAGADAHIAAABIAHALIAJAUIAAABQAFAKAGAFQgFgBgHgIgATyx6QAAgIgDgEIgBgHIgBgFIgCgMIAuAMIgEADIgfgCIAFAYIgIAFgASlyPQAHgFAHgCIASgGQAWgJAQAHIABALIAAABQgjgIgpARgAUIyMIgSgFIAfACIgEADIgJAAgAT2yRg");
	this.shape_52.setTransform(-132.7,327.4842);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#D14955").ss(1,1,1).p("AAThUIAFACIADABIABAAIgDAAIgBAAIgFgBAgrhIIgHADIAHgFIAEgEAAjBRIAFgCIAFgDAAuBVIAFgF");
	this.shape_53.setTransform(-234.025,488.6);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#000000").ss(0.1,1,1).p("AAxhSIAAgBIAAAAAAYhRIAAAVIAZAAIAAgTIAAgBIAAgBAgThMIAAACIABACIAAAPIAWALIgBggAgUBJIAPgLIAIAAIABAWAhAgLQBmgEATBNQABADABAEIAGAHAA6BEIAAABIABAAAAuBUIgIgTIAUADAA5A+QAAADABAD");
	this.shape_54.setTransform(-236.475,488.625);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#D14955").ss(0.1,1,1).p("AgNhUIAGAAIgFAAAgMhQIAFgBQgBAAAAAAAgMhRIAAgBIAAAAIAAgBAgOhQIACABIAEABIgEgCAgMhTIACABAgRhSIADACIACAAAAOBQIAEgDIgDgBIgGgDIgCABAACBPIABgBIAAAAIAAAAAADBTIAAACIACgBAAFBTIAAABIAEAA");
	this.shape_55.setTransform(-230.325,488.675);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#D14955").ss(2,1,1).p("AAChZQAJAAAIACQACAAACABIABAAIAAAAIAEABQAUAGAQAQQAbAaAAAlQAAARgGAOQgHASgOAOQgFAFgFAEQgBABgBABQgDABgCACAg2BIQgFgEgFgFQgNgOgHgSQgGgOAAgRQAAgHABgHQADgSAKgPQAFgIAHgIQAKgJALgGQACgBACgBQAHgEAJgCAgRhXQAHgCAHAAAAXBXQgCAAgBABAAoBRQgDABgBABQgFABgEACAgSBYQAAAAgBAAAASBYQgJACgJAAQgIAAgIgCAgUBYQgPgEgNgJ");
	this.shape_56.setTransform(-234.025,488.875);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#000000").ss(1,1,1).p("AjMAZQAEgFAFgEQA7h+BjA+QAJAFAJAHQABACABACQACADACAEQAJAEAHAFAAegXQALgEAJgDQABgBAAgBAA7gxQA/hJBTBtACIAhIAAAAQAGABAGABQAFAAAFABQAFAAAEABQABAAAAAAIAAAAQAKACAKACIAAAAQAIACAIACABKAlQADgBACgBQABAAAAAAIAAAAIAAAAQAHgBAIgBQACAAACAAQAJgBAKABQAFAAAEAAAi2BPQACgFACgEQAEgGADgDQABAAAAAAIAHgBIB0gXIAbgFIABAAQAJAAAGANAA5AsQAHgDAHgC");
	this.shape_57.setTransform(-239.95,445.3414);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#079BF4").ss(0.1,1,1).p("AARgFIghAM");
	this.shape_58.setTransform(-3.525,212.2);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#000000").ss(0.1,1,1).p("ATszVIAvAMIAEAAIgIADIgfgCIASAFQAEAAAFAAIAEgDATuzJIABAAIgDgMQABAFABAGIAAABQgjgIgqARIAGgGAUTzDIAZAFAUfzJIAFABATwy/QAAABABABIgBgHIAAAFIAAAAIAEASIAAACAT4zIIAEAYIgHAFAT0yxQAAACAAACIAAACIABAAgATxy9QACAEABAIAUBxwIgMg7ATGzTQAXgJAPAHATuzJQABACABADIgBgFAQAwGIgeAZAzbQXQAhgfAdgNQAmgTAfAMQAGACAFACQApARgBAEQAdgTAagLQAQgGATAEQAMADAMAGQAbAPAhAUQAHAFAHAEQABABABABAsPSxQABgLgEgFQAAgBAAAAQgHgLgRAAAs2R7QAFgFAGgBQAIgBAIAHAtySNIABAAQAEgPAEgCQAMgVgEgRAsvTCIgPgfAxCSEQAAgBAAAAQARgZgKggAv7REQgKAfAcAZIABAAQABACAEALAwgQHQgEgGgygRQgpgOg4AkQgLAHgBAKAzZShQAAAAAAAAQgcgMADgiA0ESSQgFgEgGgBQAAAAgBgBQgHAAgIAGA0LTZIAQghA0rTIQAAgCAAgBQAAgJADgFQAHgLARAB");
	this.shape_59.setTransform(-132.8765,332.9842);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#D14955").s().p("AACACQAAgBABAAQAAgBAAAAQAAAAAAAAQgBAAAAAAIgCAAIgBAAIgCAAIgBAAIAAAAQAAAAABAAQAAAAABgBQAAAAABAAQAAAAABAAIgBAAIABgBIAFACIgEADgAgFAAIABAAIgBAAgAgEAAg");
	this.shape_60.setTransform(-229.4,496.275);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#DE7E72").s().p("AAMAzIAAgBIgBgBIgCgCIAAgCIgBgBIgBgWIgIAAIgPALIgBABIgDAAIACABIgBAAIgEgCQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAABAAAAIAAAAIgKgJQgOgOgHgQQgFgPAAgRIABgOQBmgEATBNIABAGIgUgDIAIATIAAABIAAAAIgDABIgCACQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAABAAIABAAQgJACgKAAQgJAAgHgBgAAIAyIABgBIABABIgCAAg");
	this.shape_61.setTransform(-236.875,492.6175);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#990000").s().p("AAjBSIAEgCIAAgBIABAAIgBABIAAABIAAAAIAAABIAAACIAAABIgEABIAAgEgAAuBKIgCABIgDABIgBABIgGgHIgCgHQgThNhmAEQACgSAKgPQAFgJAIgIQAJgJALgGIAAACIABACIAAAPIAXALIgBggIACgBIgBgCIACgBIAAgBIABgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAgBAAIAOgBIABABIgBABQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAABIACABIACAAIAAAVIAYAAIAAgTIAAgBIAAgBIAAAAIAAAAIACAAIAAAAIABAAIACAAIgDgBIgCgBIACABIgCAAIAAgBIAAAAIADABQAUAGARAPQAaAbAAAkQAAARgFAPQgHARgOAOIgKAJIgDACgAgyhEIAHgDIgHADIAGgFIgGAFgAAbhNIgDgCIAFgBIgFABIADACIgDgBgAAbhQIgDAAgAAhBGIAAgBIgBgGIACAHgAAgA/IAAAAgAgyhEgAAYhQIAAgBIAAABg");
	this.shape_62.setTransform(-233.975,488.525);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFF99").s().p("AAZBaIABgBIAAgBIgDABIgCAAIgBAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQABgBAAAAIACgCIADgBIgBAAIABgBIgIgTIAUADIAAABIAAAAIAHAHIABgBIACgBIABAAQAAAAgBAAQAAAAgBABQAAAAgBAAQAAABgBAAIAAAAIAAABIAAgBIABAAIABgBIACABIABgBIACAAQABAAAAABQAAAAAAAAQAAABAAAAQAAABgBAAIgBACIgCABIgBABIAAAAIgCABIgCABIgBgBIAAgCIABgBIgBAAIABgBIAAgBIAAAAIAAABIgFACIABAEIgJADIgBABIgBAAIgBABIAAAAIgBABIADgBIgCABIgBAAIgBAAgAArBOIAFgDgAgPBZIgBgBIAAABIABABIgBAAIgBgBQgPgEgNgIIgBABIgBgBIgCABIAAgBIACgBIgDgCQAAAAgBAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIABAAQAAgBAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAIAEACIABAAIgCgBIADAAIACgBIAOgLIAJAAIACAWIABABIAAACIACACIAAABIAAABIgBAAgAgng6IgBgPIAAgCIAEgEIgEAEIAAgCIAEgCQAHgEAJgBIgBgBIABgBIABAAIAEgCIgCACIABAAIACAAQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAgBAAIAAABIAAABIgCABIAAACIgBABIAAAggAADg9IAAgVIgDAAIgBgBQAAgBAAAAQAAgBAAAAQAAAAAAAAQABAAAAAAIAAgBIAAgBIAAgBIACAAIAAgBIABABIABAAIABAAIAAABQAJAAAIACIAEAAIABABIAAAAIAAAAIAAABIgFgCIAFACIAAAAIAAABIAAAAIgFgBIAFABIAAABIgCAAIgDgCIADACIACABIAAATgAAZhRIACAAIAAABgAAZhRgAAfhSIgBAAIgDgBIACAAIADABIgBAAgAAbhSIAAAAIABAAIAAAAgAAdhSIgBAAIgBgBIAAAAIADABgAAbhTg");
	this.shape_63.setTransform(-234.3292,488.7375);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AivBGQgcgMADghQA7h+BkA+IgHgBQgHAAgHADIgEADIgDACQgGAGgBAJIAAABIgBAEIAAABIAAABQABAKAHAIIAHAFIADABIABABQAEABAGAAQAMAAAJgIIADgEQAGgFAAgJIAAAAIAAgDIAAgBIAAgBIgBgDIAAAAIgCgFIAEAHQAKAfgRAZIAAABIgbAFIAbgGIAAAAIAAAAIgbAGIh1AXIgHABIAAAAIAAAAIAHgBIgHABIAAAAgAC3AyIABAAIgBAAIAAAAgAC3AyQgKgPgJALIgBAAIAAAAIgJgBIgLgCIgLgBIgBAAQAAAAAAAAQgBAAAAAAQAAAAgBgBQAAAAgBgBQgEgEgDAAQgDABgEAEIgTAAQgNgLgGAOIgBAAIAAAAIgGgGIABAIIAAAAIgFgNIgBAAQgcgZAKgdIAAgCIAAADIAAABIAAABQABAJAFAHQAIAFAHADQAGABAHAAIAIgEIAEgDIABAAQAIgIAAgMIAAAAIgBgGIAAAAIgBgDQgCgGgEgFIgBgBIgGgEQgGgDgHAAQgKAAgIAIQA+hJBTBtQAEARgMAUQgEACgEAPgAB/ARQAGAAAGgEIAAAAIABgBIABAAIgBAAIgBABIAAAAQgGAEgGAAIAAAAIAAAAQgIAAgIgHIgBgBIABABQAIAHAIAAIAAAAIAAAAgAC3AygABgAqIgBgBIATAAQgFAFgFAAQgEAAgEgEgACjAuIAAAAIABAAIgBAAIAAAAgACkAugABLAsIAAAAIABAAIgBAAIAAABgACJArQgFAAAAgBIALABIAAAAIgGAAgAByApIAAAAg");
	this.shape_64.setTransform(-239.4793,444.4664);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FAB7AE").s().p("AgBgIIABABQABAEABAHIAAAEIgBABg");
	this.shape_65.setTransform(-6.275,212.325);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AyEShIgBgBIgCgBIgHgFQgIgIAAgLIAAgBIAAgBIAAgEIAAgBQACgJAGgGIADgCIAEgDQAGgDAHAAIAHAAIASAMIACAEIACAGIAAAAIAAABIABABIAAAEIAAABQAAAJgFAHIgEAEQgIAIgNAAQgFAAgFgBgAwFSYQgIgDgHgGQgFgHgBgJIAAgBIAAgBIAAgDQABgKAHgHIAAgBQAIgHALAAQAHAAAGADIAGAEIAAABQAFAFACAGIABADIAAAAIAAAGIAAAAQAAAMgIAIIAAABIgEADIgJAEIgEAAIgIgBgAxhR1IAAAAgAxzRpQAIACAGAGIAEAEIgSgMgAz7ROQAhgfAdgNQAngTAeAMIAMAEQAoARgBAEQAdgTAbgLQAQgGATAEQALADAMAGQAcAPAgAUIAOAJIADACIgOAAIgCgCIgBgBIgEgCIAAgBIgOgKIgBgCIgDAAQg9gmg4AZQgPAHgPALQgEgGgxgRQgqgOg4AkQgLAHgBAKgATUx6QAAgIgCgEIgCgHIgBgFIgCgMIAvAMIgFADIgegCIAEAYIgIAFgASIyPQAGgFAHgCIASgGQAXgJAPAHIACALIAAABQgkgIgpARgATryMIgSgFIAeACIgEADIgIAAgATZyRg");
	this.shape_66.setTransform(-129.725,327.4842);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#D14955").ss(0.1,1,1).p("AgLhIIABAAIADACQABAAAAAAAgKhFIAAgBAgKhHIACABAgMhEIACAAIAEgBQAAAAgBAAAgMhEIACABIADAAIgDgBAgPhGIADACAAMBEIAEgCIgDgCIgFgCIgBABAAFBIIADAAAAEBGIABACAACBDIABAAAADBHIAAACIACgB");
	this.shape_67.setTransform(-230.75,488.7);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#000000").ss(0.1,1,1).p("AAqhGIAAAAAAVhEIAAARIAVABIAAgRIAAAAIAAgBIAAAAAgQhAIAAABIAAABIABAOIASAJIAAgbAgRA+IANgJIAGAAIABASAAoBIIgHgRIASADIAAABIAAAAIAGAFAAxA1QABADABACAAxA1QACADAAADAg4gJQBZgDAQBB");
	this.shape_68.setTransform(-236.075,488.65);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#D14955").ss(1,1,1).p("AARhHIAEABIACABIABABIgDAAIAAAAIgFgBAglg9IgGADIAFgFIAEgDAAoBIIAEgEAAfBFIADgCIAFgC");
	this.shape_69.setTransform(-233.95,488.625);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#D14955").ss(2,1,1).p("AAVhJQAAAAAAABIADAAAAChLQAHAAAIACQABAAABAAIABAAAgvA9QgFgDgEgEQgMgMgFgPQgFgNAAgOQAAgFABgGQACgQAIgMQAFgIAGgGQAJgIAJgFQACgBACgBQAGgDAIgCAgPhKQAGgBAGAAAAZhIQARAGAOANQAXAWAAAfQAAAOgFANQgGAPgMAMQgFAEgEADQgBABgBABQgCABgCACAAiBFQgBABgCABQgEABgEABAATBKQAAAAgBAAQgBABAAAAAgQBLQAAAAgBAAAAPBLQgHABgIAAQgHAAgHgBAgRBLQgOgDgLgI");
	this.shape_70.setTransform(-233.95,488.825);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#000000").ss(1,1,1).p("AjMAaQAEgEAFgFQA7h+BjA+QAJAFAJAHQABACABACQACAEACADQAJAEAHAFAAegWQALgEAJgDQABgBAAAAAA7gwQA/hIBTBsABJAjIABAAQABgBABAAQAzglAyAlQAFAAAGAIQAAABAAAAAipA7IgBADIAAAAIAHgBQAphIBBAiIAQAFIAVAFIABAAQAJABAGAMAi6BOQAGgDACgEQAEgGAIgP");
	this.shape_71.setTransform(-239.95,445.2164);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#000000").ss(0.1,1,1).p("ATszVIAvAMIAEAAIgIADIgfgCIASAFQAEAAAFAAIAEgDIAEgDATuzJIABAAIgDgMQABAFABAGIAAABQgjgIgqARIAGgGAUTzDIAZAFAUfzJIAFABATwzEIAAAFIAAAAQAAABABABIgBgHIgBgFAT4zIIAEAYIgHAFATwy/IAEASIAAACAT0yxQAAACAAACIAAACIABAAgATxy9QACAEABAIAUNxwIgMAAIgMg7ATGzTQAXgJAPAHATuzJQABACABADAQAwGIgeAZAzbQXQAhgfAdgNQAmgTAfAMQAGACAFACQApARgBAEQAdgTAagLQAQgGATAEQAMADAMAGQAbAPAhAUQAHAFAHAEQABABABABAsPSxQABgLgEgFQAAgBAAAAQgHgLgRAAAsvTCIgPgfAtySNIABAAQAEgPAEgCQAMgVgEgRAs2R7QAFgFAGgBQAIgBAIAHAxCSEQAAgBAAAAQARgZgKggAv7REQgKAfAcAZIABAAQABACADAIAwgQHQgEgGgygRQgpgOg4AkQgLAHgBAKAzZShIABAAIAAgDIAEgJQghAAADgiA0ESSQgFgEgGgBQAAAAgBgBQgHAAgIAGA0LTZIAQghA0rTIQAAgCAAgBQAAgJADgFQAHgLARAB");
	this.shape_72.setTransform(-132.8765,332.9842);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#D14955").s().p("AABACQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIgBAAIgBAAIgCAAIACgBIgBAAIACgBIAEACIgEADg");
	this.shape_73.setTransform(-229.85,495.125);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#DE7E72").s().p("AAKArIAAgBIgCgCIAAgBIAAgBIgBgBIgBgSIgHAAIgNAJIgBABIgDAAIACABIgBAAIgDgBQgBAAAAgBQAAAAAAAAQAAAAAAAAQgBABAAAAIAAAAIgJgHQgMgMgFgOQgFgNAAgOIABgMQBZgDAQBBIABAFIgRgDIAHARIgBAAIAAAAIABAAIgFADIABACIAAAAIgQABIgOgBgAAHArIAAgBIABABIgBAAgAAsAqIAAAAIgBABg");
	this.shape_74.setTransform(-236.425,492.0185);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#990000").s().p("AAeBGIAEgCIgBAAIABABIgBABIAAACIABAAIgEABIAAgDgAAoA/IgCABIgCABIgBAAIgFgFIgCgGIACAGIgBgBIAAAAIgBgFQgRhBhYADQABgQAJgMQAEgIAHgHQAIgHAKgFIAAABIAAABIABANIAUAJIgBgaIABgBIAAgCIACgBIAAAAIAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAAAIAMgBIAAACQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAABAAAAIACABIACAAIAAASIAVAAIAAgQIAAgBIAAAAIAAgBIAAAAIACAAIACAAIgEABIAEgBIgDgBIgBAAIABAAIgBAAIAAAAIACAAIABAAQARAFAPANQAWAXAAAeQABAPgFANQgGAOgMAMIgJAIIgCACgAgrg6IAFgDIgFADIAFgEIgFAEgAAXhBIgCgCIACACIgCgBIACABgAgrg6gAAXhBgAAXhEgAAVhEIAAAAIABAAIABAAg");
	this.shape_75.setTransform(-233.9,488.55);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFF99").s().p("AAWBNIAAgBIAAgBIgBABIgBAAIgBABIgBAAIAAAAIgBgCIAFgDIgBAAIAAgBIABAAIgHgRIARAEIAAAAIABABIAFAFIABgBIACAAIABAAIgCABIACAAIABAAIACAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAIgBABIgCACIgBABIAAgBIgCABIAAAAIgCABIAAgBIAAgBIAAgBIAAgBIAAAAIgDABIAAAEIgIADIAAAAIgBABIgBAAIgBABIACgBIgCABIAAAAIgBAAgAAlBDIAFgDgAgMBNIgBAAIgBgCIAAABIAAABIAAgBQgOgDgLgHIgBAAIAAAAIgCABIAAgBIABgBIgCgBIgBgBIAAgBQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAAAIADABIABAAIgCgBIADABIABgBIANgKIAIAAIABATIABAAIAAACIAAAAIACADIAAABIgBAAgAgigxIAAgNIgBgBIAEgDIgEADIAAgBIAEgCIAOgFIgBAAIABgBIABAAIADgCIgCACIABgBIACABQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAgBABIAAAAIAAABIgCABIAAACIgBABIABAagAACgzIAAgSIgCAAIAAgBQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIAAgCIAAAAIACAAIgBgCIABACIABAAIABAAIABAAIAPACIACABIABAAIABAAIAAAAIAAABIgEgCIAEACIAAABIAAgBIACABIgCAAIAAAAIAAAAIgFgBIAFABIAAABIgCAAIgDgCIADACIACABIAAAQgAAYhDgAAWhEIACAAIAAAAIAAABgAAYhEgAAbhFIgBAAIgCgBIACAAIACABIgBAAgAAYhGg");
	this.shape_76.setTransform(-234.2312,488.6875);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AiuBGIAGgBIgHABgAivBGIABgDIAEgJQghAAADghQA7h+BkA+IgHgBQgHAAgHADIgEADIgDACQgGAGgBAJIAAABIgBAEIAAABIAAABQABAKAHAIIAHAFIADABIABABQAEABAGAAQAMAAAJgIIADgEQAGgFAAgJIAAAAIAAgDIAAgBIAAgBIgBgDIAAAAIgCgFIAEAHQAKAfgRAZIAAABIgVgGIAVAFIAAAAIAAAAIgVgFIgRgEQhAgjgqBJIgGABIAAgDIAAADgAiuBGgAioBFgAC3AyQgGgIgFgBQgyglgyAlIgDgDIABAFIgBAAIAAAAIgEgKIgBAAQgcgZAKgdIAAgCIAAADIAAABIAAABQABAJAFAHQAIAFAHADQAGABAHAAIAIgEIAEgDIABAAQAIgIAAgMIAAAAIgBgGIAAAAIgBgDQgCgGgEgFIgBgBIgGgEQgGgDgHAAQgKAAgIAIQA+hJBTBtQAEARgMAUQgEACgEAPIgBAAIAAAAgAB/ARQAGAAAGgEIAAAAIABgBIABAAIgBAAIgBABIAAAAQgGAEgGAAIAAAAIAAAAQgIAAgIgHIgBgBIABABQAIAHAIAAIAAAAIAAAAg");
	this.shape_77.setTransform(-239.477,444.4664);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AyEShIgBgBIgCgBIgHgFQgIgIAAgLIAAgBIAAgBIAAgEIAAgBQACgJAGgGIADgCIAEgDQAGgDAHAAIAHAAIASAMIACAEIACAGIAAAAIAAABIABABIAAAEIAAABQAAAJgFAHIgEAEQgIAIgNAAQgFAAgFgBgAwFSYQgIgDgHgGQgFgHgBgJIAAgBIAAgBIAAgDQABgKAHgHIAAgBQAIgHALAAQAHAAAGADIAGAEIAAABQAFAFACAGIABADIAAAAIAAAGIAAAAQAAAMgIAIIAAABIgEADIgJAEIgEAAIgIgBgAxhR1IAAAAgAxzRpQAIACAGAGIAEAEIgSgMgAz7ROQAhgfAdgNQAngTAeAMIAMAEQAoARgBAEQAdgTAbgLQAQgGATAEQALADAMAGQAcAPAgAUIAOAJIADACIgOAAIgCgCIgBgBIgEgCIAAgBIgOgKIgBgCIgDAAQg9gmg4AZQgPAHgPALQgEgGgxgRQgqgOg4AkQgLAHgBAKgARfwlIgJgOQgMgTgCgIQgBgJADgJIAJgOIAIgPIgDANQgDACgBACQgCADAAAHIgBADIgCAGQgBAGADAHIAAABIAGALIAJAUIAAABQAFAKAHAFQgGgBgHgIgATUx6QAAgIgCgEIgCgHIgBgFIgCgMIAvAMIgFADIgegCIAEAYIgIAFgASIyPQAGgFAHgCIASgGQAXgJAPAHIACALIAAABQgkgIgpARgATryMIgSgFIAeACIgEADIgIAAgATZyRg");
	this.shape_78.setTransform(-129.725,327.4842);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#FFFFFF").ss(0.1,1,1).p("AgIACQAIACAJgF");
	this.shape_79.setTransform(-226.275,445.8941);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#D14955").ss(1,1,1).p("AgWgiIgEABIAEgCIACgCAAKgnIADAAIAAAAIACABAAQgmQgBgBAAAAIgCAAIgDgBAAZApIACgCAATAnIACgBIADgB");
	this.shape_80.setTransform(-234.025,488.7);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#000000").ss(0.1,1,1).p("AgJgkIAAABIAAABIAAAHIALAFIAAgPAANgmIAAAKIANAAIAAgKIAAAAIAAgBAgKAjIAIgFIAEAAIAAAKAAagnIAAgBAghgFQA1gCAKAlQAAAAAAABQABABAAABAAjAlIAAgBIgEgDAAfAhIAAAAIAAAAAAeAfQABABAAABAAZApIgFgKIALAC");
	this.shape_81.setTransform(-235.3,488.725);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#D14955").ss(0.1,1,1).p("AgGgnIAAgBIACABAgHgmIABAAAgHgmIABAAIACAAIABAAAgGgoIACAAQAAABABAAAAHAnIADgBIgCgCIgDgBIgBABAABAmIABAAAACAoIAAABIABAAAADAoIAAABIACAAAgIgnIABAB");
	this.shape_82.setTransform(-232.05,488.75);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("#D14955").ss(2,1,1).p("AgIgpQADgBADAAAABgqQAFAAAEABQABAAABAAIABAAAgcAjQgDgCgCgCQgIgHgDgJQgDgHAAgIQAAgDAAgDQACgJAFgHQADgEAEgEQAFgEAGgDQAAAAACgBQADgCAFgBAAJArIAAAAQgFAAgEAAQgEAAgEAAAgJArIgBgBAgKAqQgIgBgHgEAAPgoQAKADAJAHQAOANAAARQAAAIgDAHQgDAJgIAHQgDACgDACQAAAAgBABQgBABgCAAAAVAnQgCABAAAAQgCABgDABAAMAqQgBAAAAAA");
	this.shape_83.setTransform(-234,488.825);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#000000").ss(1,1,1).p("AjMARQAEgFAFgEQA7h+BjA+QAJAFAJAHQABACABACQACADACAEQAJAEAHAFAAegfQALgEAJgDQABgBAAgBAAzgjIAIgWQA/hJBTBtABKAaQABgBABgBQAzgkAyAkQAFABAGAIQAAAAAAABQgCASgVAFABJAaIABAAABZA4QgNgJgCgVAipAyIgBADIAAAAIAHgBQAphJBBAjIAQAEIAVAGIABAAQAJAAAGANAgTA5QAKgRgLgQAi6BFQAGgDACgEQAEgGAIgPAiVBXIgPgj");
	this.shape_84.setTransform(-239.95,446.1414);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#000000").ss(0.1,1,1).p("ATszVIAvAMIAEAAIgIADIgfgCIASAFQAEAAAFAAIAEgDIAEgDATuzJIABAAIgDgMQABAFABAGIAAABQgjgIgqARIAGgGAUTzDIAZAFAUfzJIAFABATwy/QAAABABABIgBgHIAAAFIAAAAIAEASIAAACAT4zIIAEAYIgHAFAT0yxQAAACAAACIAAACIABAAgATxy9QACAEABAIAUNxwIgMAAIgMg7ATGzTQAXgJAPAHATuzJQABACABADIgBgFAQAwGIgeAZAzbQXQAhgfAdgNQAmgTAfAMQAGACAFACQApARgBAEQAdgTAagLQAQgGATAEQAMADAMAGQAbAPAhAUQAHAFAHAEQABABABABAsPSxQABgLgEgFQAAgBAAAAQgHgLgRAAAtySNIABAAQAEgPAEgCQAMgVgEgRAsvTCIgPgfAs2R7QAFgFAGgBQAIgBAIAHAxCSEQAAgBAAAAQARgZgKggAv7REQgKAfAcAZIABAAQABACADAIAwgQHQgEgGgygRQgpgOg4AkQgLAHgBAKAzZShIABAAIAAgDIAEgJQghAAADgiA0ESSQgFgEgGgBQAAAAgBgBQgHAAgIAGA0LTZIAQghA0rTIQAAgCAAgBQAAgJADgFQAHgLARAB");
	this.shape_85.setTransform(-132.8765,332.9842);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#D14955").s().p("AABABIAAgBIgBAAIAAAAIgBAAIAAAAIgBAAIABAAIABAAIAAgBIADABIgDACg");
	this.shape_86.setTransform(-231.575,492.4);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#DE7E72").s().p("AAGAZIAAgBIgBgBIAAgBIAAAAIgBgBIAAgKIgEAAIgIAFIgBABIgBgBIABABIgBAAIgCgBIgBAAIAAABIgFgEQgHgHgEgIQgDgHAAgIIABgHQA1gCAKAlIABABIAAACIgLgCIAFAKIgDACIAAABIgJAAIgJAAgAAFAYIAAAAIAAABgAAaAYIABAAIAAAAIgBAAg");
	this.shape_87.setTransform(-235.525,490.6449);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#990000").s().p("AASAnIADgBIgBABIABAAIgBABIAAAAIABABIgCABIgBgDgAAYAkIgBAAIgBABIgBAAIgDgDIgBgCIAAgCQgKgkg2ACQACgJAFgHIAHgIQAFgEAFgDIAAABIABAAIgEACIADgCIgDACIAEgCIAAAIIAMAFIgBgPIABgBIAAAAIABgBIAAAAIAAgBIAAgBIAHgBIABABIgBAAIAAACIACABIAAAKIAMAAIAAgKIAAAAIAAgBIABAAIABAAIAAAAIABABIgBAAIgBgBIABABIgCAAIACAAIABAAIgBgBIgCAAIAAgBIACABIABAAQAKADAJAHQAOANAAAQQAAAJgDAHQgEAIgHAIIgGADIgBABgAARAiIAAAAIAAgCIABACgAgagggAgWgigAAOglg");
	this.shape_88.setTransform(-233.975,488.65);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFF99").s().p("AANArIABAAIAAgBIgCABIAAAAIgBAAIAAAAIgBgBIADgCIgEgJIAKABIAAABIABAAIADADIAAAAIAAAAIABAAIgBAAIABAAIAAAAIABAAIABAAIABAAIAAABIgBABIgBABIAAAAIgBABIgBAAIgBgBIAAAAIABgBIgBAAIABgBIACgBIgCABIgDABIABACIgFACIAAAAIgBABIgBAAIAAAAIAAAAIgBAAgAgHArIgBgBIAAABIAAAAIAAAAQgIgCgHgEIgCAAIABgBIgCAAIAAgBIAAAAIABAAIACABIAAgBIgBAAIACAAIABAAIAIgGIAEAAIABALIAAAAIAAABIABAAIAAACIABAAgAgUgbIAAgIIgBgBIADgBIgDABIAAAAIADgBIAIgDIgBAAIABgBIABAAIACgBIgCABIABAAIABAAIAAABIAAAAIAAAAIgBABIAAABIgBAAIABAQgAABgdIAAgKIgBgBIAAgBIAAAAIAAgBIAAAAIACAAIABAAIAJABIACABIAAAAIAAAAIgCgBIACABIAAABIgCAAIACAAIAAAAIgBABIgBgBIABABIABAAIAAAJgAAOgmgAANgmIABgBIAAABgAANgmgAAOgngAAQgnIgCgBIACABgAAPgnIgBAAIAAgBIACABgAAOgogAAOgog");
	this.shape_89.setTransform(-234.1625,488.7875);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AiuBGIAGgBIAAAAIgHABgAivBGIABgDIAEgJQghAAADghQA7h+BkA+IARAMIADAEIAEAHQAKAfgRAZIAAABIgVgGIAVAFIAAAAIAAAAIgVgFIgRgEQhAgjgqBJIgGABIAAgDIAAADgAh8glIgBABIgDACIgBAAIgDADQgGAGgCAJIAAAAIAAAFIAAABIAAABQAAAKAIAHIAHAFIACACIABAAQAFACAFAAQAIAAAGgDQAFgDADgDIAEgEQAFgGAAgJIAAgBIAAgEIgBgBIAAgBIgCgFIgCgEIgSgMIgHgBQgHAAgGADgAiuBGgAioBFgAC3AyQgGgIgFgBQgyglgyAlIgDgDIABAFIgBAAIAAAAIgEgKIgBAAQgcgZAKgdIAAgCIAAADIAAABIAAABIAJgWQA+hJBTBtQAEARgMAUQgEACgEAPIgBAAIAAAAgABmgkIgEADIgDACQgGAGgCAJIAAABIAAAEIAAABIAAABQAAAKAIAIIAHAFIACABIABABQAFABAFAAIAIgBQAIgCAFgFIAEgEQAFgGAAgJIAAgBIAAgEIgBgBIAAgBIgCgFIgCgEIgSgMIgHgBQgHAAgGADgACAARQAGAAAGgFIABAAIgBAAQgGAFgGAAIgBAAIAAAAIgCAAIAAAAIgCgBIACABIAAAAIACAAIAAAAIABAAg");
	this.shape_90.setTransform(-239.477,444.4664);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FAB7AE").s().p("AgxA0IgBAAIgBgBIgIgUIgHgLIAAgBQgBgEABgEQAAgBAAgBQAAAAAAgBQAAAAAAgBQgBAAAAgBIABgGIACgCQAAgHACgDQAAgCADgCIACgBQADgDACgJIADgEIAAgCIAAACIACgBQABAAAAAAQABAAABABQAAAAAAABQAAAAAAABIAAAGIAFgDIAFAAIADgBIAEgBIADgCIACgBIABgDIAEgFQApgRAjAIIACAFIAAAFIAAABIAEASIAAABQAAAJABAGIACAFIgEAIQgEAFgEgEQgEgBAAgHIAAgRIgBAAIAAABIAAACQAAAGgDAFQgJALgLgHIgOALIgMAFIgOAKIgGAHIgCAFQAAADgCAFQgFADgCAAIgIACIgFABIgHgCgABBgVIgEgSIABABQACAEABAIIAAAEIAAABg");
	this.shape_91.setTransform(-12.595,215.4664);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AvfShIgBAAIgDgCIgHgFQgHgHgBgLIAAgBIAAgBIABgFIAAAAQABgJAGgGIADgDIAEgCQAHgEAHAAIAHABIARAMIADAEIACAFIAAABIAAABIAAAFIAAAAQAAAJgFAHIgDAEQgGAGgHACIgIABQgGAAgEgCgAzCSgIgBAAIgDgCIgHgFQgHgHgBgLIAAgBIAAgBIABgFIAAAAQABgJAGgGIADgDIAEgCQAHgEAHAAIAHABIARAMIADAEIACAFIAAABIAAABIAAAFIAAAAQAAAJgFAHIgDAEQgEAEgEACQgGADgHAAQgGAAgEgCgAxzRpQAIACAGAGIAEAEIgSgMgAz7RNQAhgeAdgOQAngSAeALIAMAFQAoAQgBAEQAdgTAbgKQAQgHATAFQALACAMAHQAcAOAgAVIAOAJIADACIgOAAIgCgDIgBAAIgEgDIAAAAIgOgLIgBgBIgDgBQg9gmg4AaQgPAGgPALQgEgGgxgRQgqgOg4AlQgLAHgBAJgARfwmIgJgNQgMgUgCgHQgBgKADgJIAJgNIAIgPIgDAMQgDADgBACQgCACAAAIIgBADIgCAGQgBAFADAIIAAAAIAGAMIAJATIAAACQAFAJAHAFQgGgBgHgIgATUx7QAAgIgCgEIgCgHIgBgFIgCgMIAvAMIgFADIgegBIAEAXIgIAFgASIyQQAGgEAHgDIASgGQAXgIAPAGIACALIAAABQgkgIgpARgATryMIgSgFIAeABIgEAEIgIAAgATZyRg");
	this.shape_92.setTransform(-129.725,327.5342);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f().s("#000000").ss(1,1,1).p("AjzjBQAEgFAFgFQA7h+BkA9QAIAGAJAGQABACACACQABAEACAEQAJAEAIAFAAMj2IAIgXQA/hIBTBtAgHjzQAJgEAKgDQAAAAAAgBAAji4QABgBABgBQAAAAABAAQAigZAiAJQAQAEAQAMQAAAAAAAAQAFABAGAIQAAAAAAAAQgBAJgFAGIgBAAQgFAGgKACAAwidQABAAAAAAQAGgCAHgBQAagFAdALQAAAAABAAQASAIAVAOAAwidQgDgCgCgDQgBgBAAAAQgGgIgBgNAAji4IAAAAAg6iYQACgEACgFQADgNgHgMQAAAAAAAAAg6i7IAAAAQAJABAHAMAg6iYQAMAAANACAjehiQAWgOAVgKQA6gcA3gCQAEAAAEAAAAQiMQAPgLARgGAhcCKQAcDTDMhDQBJgigeh9QggAsggAXQgaAUgbAGQgbAGgbgHQgQgFgSgKQgjgUgjgqgACjBFQAQBZBBgrAjIiiQAOgXAUgKQASgKAYABQAdABAlAQAjQigIgBADIAAAAIAHgCAi8h7IgNgfIgBgEIgBAAAjhiOQAHgDABgEQAEgFAIgPAilCXQBVAGAGhAAhQjAIAWAF");
	this.shape_93.setTransform(-236.05,467.2752);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().s("#000000").ss(0.1,1,1).p("ATs2HIAvAMATu17IABAAIgDgMQABAGABAFIAAABQgjgIgqARIAGgGAUT10IAZAEAUf16IgIACIgfgBIASAFQAEAAAFAAIAEgEIAEgDIAEABIAFABATx1vIgBgHIAAAGIAAAAQAAABABAAQACAEABAIQAAACAAACIAAACIABAAIgBgGAT415IAEAXIgHAFATw1wIAEASIAAABAUN0iIgMABIgMg8ATu17QABADABACIgBgFATG2FQAXgIAPAGAQAy4IgeAZAzbNlQAhgeAdgOQAmgSAfALQAGACAFADQApAQgBAEQAdgTAagKQAQgHATAFQAMACAMAHQAbAOAhAVQAHAEAHAFQABABABABAsPP/QABgKgEgGQAAAAAAgBQgHgLgRABAs2PJQAFgEAGgBQAIgCAIAHAtyPcIABgBQAEgPAEgCQAMgUgEgSAt9PTIAAAAIgfgQIgBAAAsvQQIgPgfAviPTIAFAXAvcPqIATADIA4AGAv7OTQgKAfAcAYIABABQABABADAIAxCPSQAAAAAAAAQARgagKggAxJP1IALgJIgEgZIAAAAAwdVWIgdASIA5AaIAGgeAvFVmIAAAkIA5AAIgDg+AuRPzIAZgIAwgNVQgEgGgygRQgpgOg4AlQgLAHgBAJAxCPTIhCgSIgqAIIgkAmIAAgBQABgCABgBAzZPwIABgBIAAgDIAEgJQghABADgiA0EPhQgFgFgGgBQAAAAgBAAQgHgBgIAHA0LQoIAQghA0rQXQAAgCAAgCQAAgIADgFQAHgLARAA");
	this.shape_94.setTransform(-132.8765,350.7092);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#D14955").s().p("AkNA/QgRgEgQgPQgPgQgEgRQgFgQAIgJQAJgIARAEQASAFAPAPQAPAPAEAQQAFASgJAIQgFAGgJAAIgLgCgAD6AJQgIgHAEgPQAFgQAOgOQAPgOAPgFQAQgFAIAIQAIAIgFAQQgEAQgPAOQgOANgQAFIgKABQgIAAgFgFg");
	this.shape_95.setTransform(-233.4866,465.3779);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#DE7E72").s().p("AitAJIgCgEIAkgkIAqgJIBCASIAEAYIgLAKQg4ACg6AbgACQAJQgcgJgbADIgTgCIgBgBIgFgWIABAAQAigZAiAJIABAAIAfAQIAAAAQAFABAGAIIAAAAQgBAKgFAEIAAAAIgZAIIAAAAIgBAAg");
	this.shape_96.setTransform(-238.775,450.8607);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#990000").s().p("AiOhIQAkAqAjAUIgcARIA5AbIAGgeQAbAHAZgGIAAAlIA5AAIgDg9QAggYAggsQAeB9hJAhQgxARgoAAQh6AAgWigg");
	this.shape_97.setTransform(-231.1478,488.3588);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("ABkEUIAAglQAbgGAbgUIADA/gAgQDxIAcgSQARAKARAFIgGAegAiuiGIAGgCIAAABIgHABgAiviGIABgDIAEgJQghAAADgiQA7h+BkA9IARAMIADAEIAEAIQAKAggRAZIAAABIgVgGIAVAFIAAAAIAAAAQglgQgdgBQgYgBgSAKQgUAKgOAXIgCADIgGACIAAgDIAAADgAh8jyIgBABIgDACIgBAAIgDADQgGAGgCAJIAAAAIAAAFIAAABIAAABQAAALAIAHIAHAFIACACIABAAQAFACAFAAQAIAAAGgEQAFgCADgDIAEgEQAFgHAAgJIAAgBIAAgEIgBgBIAAgBIgCgFIgCgEIgSgMIgHgBQgHAAgGADgAiuiGgAC3iaQgGgJgFAAIAAAAQgQgMgQgEQgigKgiAaIgDgDIABAFIgBAAIAAAAIgEgKIgBAAQgcgZAKgfIAAgBIAAADIAAABIAAABIAJgXQA+hIBTBtQAEARgMAVQgEACgEAPIgBAAIAAAAgABmjxIgEADIgDACQgGAGgCAJIAAABIAAAEIAAABIAAABQAAALAIAIIAHAFIACABIABABQAFABAFAAIAIgBQAIgCAFgFIAEgEQAFgHAAgJIAAgBIAAgEIgBgBIAAgBIgCgFIgCgEIgSgMIgHgBQgHAAgGADgACAi8QAGAAAGgEIABAAIgBAAQgGAEgGAAIgBAAIAAAAIgCAAIAAAAIgCAAIACAAIAAAAIACAAIAAAAIABAAg");
	this.shape_98.setTransform(-239.477,464.9914);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("AvfShIgBAAIgDgCIgHgFQgHgHgBgLIAAgBIAAgBIABgFIAAAAQABgJAGgGIADgDIAEgCQAHgEAHAAIAHABIARAMIADAEIACAFIAAABIAAABIAAAFIAAAAQAAAJgFAHIgDAEQgGAGgHACIgIABQgGAAgEgCgAzCSgIgBAAIgDgCIgHgFQgHgHgBgLIAAgBIAAgBIABgFIAAAAQABgJAGgGIADgDIAEgCQAHgEAHAAIAHABIARAMIADAEIACAFIAAABIAAABIAAAFIAAAAQAAAJgFAHIgDAEQgEAEgEACQgGADgHAAQgGAAgEgCgAxzRpQAIACAGAGIAEAEIgSgMgAz7RNQAhgeAdgOQAngSAeALIAMAFQAoAQgBAEQAdgTAbgKQAQgHATAFQALACAMAHQAcAOAgAVIAOAJIADACIgOAAIgCgDIgBAAIgEgDIAAAAIgOgLIgBgBIgDgBQg9gmg4AaQgPAGgPALQgEgGgxgRQgqgOg4AlQgLAHgBAJgARfwmIgJgNQgMgUgCgHQgBgKADgJIAJgNIAIgPIgDAMQgDADgBACQgCACAAAIIgBADIgCAGQgBAFADAIIAAAAIAGAMIAJATIAAACQAFAJAHAFQgGgBgHgIgATUx7QAAgIgCgEIgCgHIgBgFIgCgMIACALIAAABQgkgIgpARIAGgGQAGgEAHgDIASgGQAXgIAPAGIAvAMIgFADIgegBIAEAXIgIAFgATryMIgSgFIAeABIgEAEIgIAAgATZyRg");
	this.shape_99.setTransform(-129.725,327.5342);

	this.instance_1 = new lib.kiss();
	this.instance_1.setTransform(-236.55,491.5,0.1155,0.1171,0,0,180,109.9,79);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#FF0000").ss(0.1,1,1).p("ABigrIAAgBABigrIAGgNIAEgIABkgdIAAgDIgCgLABRAZIAHAHIAcAXIAHgRIABgBIAHgOQABgDACgCAh0ghIAIgQIACgFAhygWIgCgLIAAgBAiFAjIAjAeIALgZIACgEIACgDQABgDACgC");
	this.shape_100.setTransform(-236.875,443.6);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().s("#000000").ss(1,1,1).p("AgTg4QABACABABQACAEACAEQAJAEAHAFAAegsQALgEAJgDQABAAAAgBAAzgvIAIgXQAignAoAOACFhfQABAAABABAC+g0QAHAJAIAKACbAAQALAEALAIIAAAAQAFAAAGAJQAAAAAAAAQgBAJgGAGIAAAAQgFAGgLACABKAOQABgBABgBQAAAAAAAAQAWgPAVgCABJAOIABAAABXApQgDgCgDgDQAAgBAAAAQgGgIgBgNABXApQABAAAAAAQAGgCAGgBQAbgFAdALIAAAAQATAIAUAOAgTAuQACgEABgFQAEgNgHgMIgBAAAgUALIABAAQAJABAGAMAgTAuQAMAAALACAi3BkQAWgOAVgKQA6gcA3gCQAEAAAEAAAA3A6QAPgLARgGAhPhXQABAAAAAAAihAkQAOgXAUgKQAKgEALgDAipAmIgBADIAAAAIAHgCAiVBLIgNgfIgBgEIgBAAAjMAFQAEgFAFgEQAthhBGAOAi6A4QAGgDACgEQAEgGAIgOAgpAGIAVAFAg2AAQAQADASAI");
	this.shape_101.setTransform(-239.95,447.391);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("#000000").ss(0.1,1,1).p("ATszVIAvAMATuzJIABAAIgDgMQABAFABAGIAAABQgjgIgqARIAGgGAUTzDIAZAFAUfzJIgIADIgfgCIASAFQAEAAAFAAIAEgDIAEgDIAEAAIAFABATwzEIAAAFIAAAAQAAABABABIgBgHIgBgFAT0yrIABAAIgBgGQAAACAAACgAT4zIIAEAYIgHAFATwy/IAEASIAAACATxy9QACAEABAIAUNxwIgMAAIgMg7ATuzJQABACABADATGzTQAXgJAPAHAQAwGIgeAZAwDP1QAFgRAdgOQAdgNAIABQAJACAZACQAZABAJAfQAIAgAHAEQABABABABAzbQXQAhgfAugcQAugcA1AOQA2APgKAIQgJAIADAIAwRPzQAFADAJgBQgfgUgWgGQgkgLgzAfQgzAegBAKAsPSxQABgLgEgFQAAgBAAAAQgHgLgRAAAs2R7QAFgFAGgBQAIgBAIAHAtySNIABAAQAEgPAEgCQAMgVgEgRAt9SEIAAAAIgWgLAsvTCIgPgfAviSEIAFAXAvcScIATACIA4AGAv7REQgKAfAcAZIABAAQABACADAIAxCSEQAAgBAAAAQARgZgKggAxJSmIALgJIgEgZIAAAAAuRSkIAZgIAyVR2IgZAFIgkAlIAAgBQABgBABgCAzZShIABAAIAAgDIAEgJQghAAADgiA0ESSQgFgEgGgBQAAAAgBgBQgHAAgIAGA0LTZIAQghA0rTIQAAgCAAgBQAAgJADgFQAHgLARABAxCSEIgkgK");
	this.shape_102.setTransform(-132.8765,332.9842);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FF0000").s().p("AiCAqIAAAAIgEgCIgKgGQgWgPgCgRQgEgSARgQQAJgKAKABQAMAAAJASIAEAIIgCgLIAIgQIACgFIgEAFIgBABQgEAHgBAHQABgIAEgIIABgCQAHgKAKgDQAKgEAMADQALADAGAJQAIALgCAQIgBAIQgDAKgFAIIgSAXIgFAGIgDAFIgCADIgBAEIgMAZgABbAmIgHgGIgDgBIgBgCIgGgDIgEgCQgWgPgCgQQgEgTARgQQAJgKAKABQAMAAAJASIAEAIIgCgLIAHgOIADgHIgFAGIAAABQgEAGgBAHQABgHADgHIACgEQAHgKAKgDQAGgDAHAAIAJACQALADAGAJIACADQAGAKgCAOQgBALgGAMIgCAEIgSAWIgFAGIgDAFIgHAOIAAABIgIARgABngWIAAgDg");
	this.shape_103.setTransform(-237.193,442.9372);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#DE7E72").s().p("AitAJIgCgEIAkgkIAYgFIABAAIAjAdIALgZIAlAKIAEAYIgLAJQg4ACg6AcgACQAJQgcgKgbAEIgTgCIgBgBIgFgWIABAAQAVgQAVgCIAcAXIAIgQIAWALIAAAAQAFABAGAIIAAAAQgBAJgFAFIAAAAIgZAIg");
	this.shape_104.setTransform(-238.775,450.8875);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AiuBGIAGgBIAAAAIgHABgAivBGIABgDIAAADgAiuBDIAEgJQghAAADghQAuhhBFAOQgEAIgBAIQABgIAEgHIABgBIACABIgIAPIAAAAIAAAAIACALIgEgHQgJgSgMgBQgKAAgJAKQgRAQAEATQACAQAWAOIAKAHQgLACgKAFQgUAKgOAXIgCAEIgGABgAiuBDgAC3AyQgGgIgFgBIAAAAQgLgIgLgEIAHgPIADgEIAFgHIASgWIACgEIAPATQAEARgMAUQgEACgEAPIgBAAIAAAAgABFArIAAAAIgEgKIgBAAQgcgZAKgdIAAgCIAAADIAAABIAAABIAJgWQAhgnAoANQgDAHgBAHQABgHAEgHIACABIgHANIAAAAIAAAAIACALIgEgHQgJgSgMgBQgKAAgJAKQgRAQAEATQACARAWANIAEACIAFAEIABAAIABABIADACIAHAGQgVACgVAQIgDgDIABAFgAgtAjIAVAFIAAAAIAAAAQgTgIgQgEIACgEIADgEIAFgHIASgWQAFgJADgJIACAEIAEAHQAKAfgRAZIAAABgAhagqg");
	this.shape_105.setTransform(-239.477,444.466);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("Az7R4QAhgfAugcQAugcA2AOQA1APgJAIQgKAIAEAIQgggTgWgHQgjgLg0AfQgzAegBAKgAuMR1IgCgDQgHgJgLgDIgJgBIAAAAIgBgCIgDAAQAAg+h1AxQAEgRAdgOQAdgNAJACQAIABAaACQAZABAIAgQAIAfAHAEIADACgARfv7IgJgOQgMgTgCgIQgBgJADgJIAJgOIAIgPIgDANQgDACgBACQgCADAAAHIgBADIgCAGQgBAGADAHIAAABIAGALIAJAUIAAABQAFAKAHAFQgGgBgHgIgATUxQQAAgIgCgEIgCgHIgBgFIgCgMIACALIAAABQgkgIgpARIAGgGQAGgFAHgCIASgGQAXgJAPAHIAvAMIgFADIgegCIAEAYIgIAFgATrxiIgSgFIAeACIgEADIgIAAgATZxng");
	this.shape_106.setTransform(-129.725,323.2592);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f().s("#000000").ss(1,1,1).p("AgTg4QABACABABQACAEACAEQAJAEAHAFAAzgvIAIgXQAignAoAOAAegsQALgEAJgDQABAAAAgBACFhfQABAAABABAC+g0QAHAJAIAKACbAAQALAEALAIIAAAAQAFAAAGAJQAAAAAAAAQgBAJgGAGIAAAAQgFAGgLACABKAOQABgBABgBQAAAAAAAAQAWgPAVgCABJAOIABAAABXApQABAAAAAAQAGgCAGgBQAbgFAdALIAAAAQATAIAUAOABXApQgDgCgDgDQAAgBAAAAQgGgIgBgNAgTAuQACgEABgFQAEgNgHgMIgBAAAgUALIABAAQAJABAGAMAgTAuQAMAAALACAi3BkQAWgOAVgKQA6gcA3gCQAEAAAEAAAA3A6QAPgLARgGAhPhXQABAAAAAAAihAkQAOgXAUgKQAKgEALgDAipAmIgBADIAAAAIAHgCAiVBLIgNgfIgBgEIgBAAAjMAFQAEgFAFgEQAthhBGAOAi6A4QAGgDACgEQAEgGAIgOAgpAGIAVAFAg2AAQAQADASAI");
	this.shape_107.setTransform(-239.95,447.391);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f().s("#000000").ss(0.1,1,1).p("ATszVIAvAMATuzJIABAAIgDgMQABAFABAGIAAABQgjgIgqARIAGgGAUTzDIAZAFAUfzJIgIADIgfgCIASAFQAEAAAFAAIAEgDIAEgDIAEAAIAFABATxy9IgBgHIAAAFIAAAAQAAABABABQACAEABAIQAAACAAACIAAACIABAAIgBgGAT4zIIAEAYIgHAFATwy/IAEASIAAACAUNxwIgMAAIgMg7ATuzJQABACABADIgBgFATGzTQAXgJAPAHAQAwGIgeAZAwDP1QAFgRAdgOQAdgNAIABQAJACAZACQAZABAJAfQAIAgAHAEQABABABABAzbQXQAhgfAugcQAugcA1AOQA2APgKAIQgJAIADAIAwRPzQAFADAJgBQgfgUgWgGQgkgLgzAfQgzAegBAKAsPSxQABgLgEgFQAAgBAAAAQgHgLgRAAAs2R7QAFgFAGgBQAIgBAIAHAtySNIABAAQAEgPAEgCQAMgVgEgRAt9SEIAAAAIgWgLAsvTCIgPgfAviSEIAFAXAvcScIATACIA4AGAv7REQgKAfAcAZIABAAQABACADAIAxCSEQAAgBAAAAQARgZgKggAxJSmIALgJIgEgZIAAAAAuRSkIAZgIAyVR2IgZAFIgkAlIAAgBQABgBABgCAzZShIABAAIAAgDIAEgJQghAAADgiA0ESSQgFgEgGgBQAAAAgBgBQgHAAgIAGA0LTZIAQghA0rTIQAAgCAAgBQAAgJADgFQAHgLARABAxCSEIgkgK");
	this.shape_108.setTransform(-132.8765,332.9842);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]},228).to({state:[{t:this.shape_14},{t:this.shape_6},{t:this.shape_8},{t:this.shape_4},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_3},{t:this.shape_1},{t:this.shape_10},{t:this.shape_9}]},119).to({state:[{t:this.shape_21},{t:this.shape_6},{t:this.shape_8},{t:this.shape_4},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_3},{t:this.shape_1},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},3).to({state:[{t:this.shape_27},{t:this.shape_6},{t:this.shape_8},{t:this.shape_4},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_3},{t:this.shape_1},{t:this.shape_23},{t:this.shape_16},{t:this.shape_22}]},3).to({state:[{t:this.shape_32},{t:this.shape_6},{t:this.shape_8},{t:this.shape_4},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_3},{t:this.shape_1},{t:this.shape_23},{t:this.shape_16},{t:this.shape_28}]},4).to({state:[{t:this.shape_42},{t:this.shape_6},{t:this.shape_8},{t:this.shape_4},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_29},{t:this.shape_3},{t:this.shape_1},{t:this.shape_23},{t:this.shape_16},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33}]},3).to({state:[{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_37},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_16},{t:this.shape_36},{t:this.shape_33},{t:this.shape_35},{t:this.shape_34}]},4).to({state:[{t:this.shape_66},{t:this.shape_65},{t:this.shape_51},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_16}]},10).to({state:[{t:this.shape_78},{t:this.shape_50},{t:this.shape_51},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_44},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_16}]},2).to({state:[{t:this.shape_92},{t:this.shape_91},{t:this.shape_51},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_44},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79}]},2).to({state:[{t:this.shape_99},{t:this.shape_50},{t:this.shape_51},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_44},{t:this.shape_93},{t:this.shape_79}]},2).to({state:[{t:this.shape_106},{t:this.shape_91},{t:this.shape_51},{t:this.shape_105},{t:this.shape_104},{t:this.shape_95},{t:this.shape_103},{t:this.shape_102},{t:this.shape_44},{t:this.shape_101},{t:this.shape_100},{t:this.instance_1}]},102).to({state:[{t:this.shape_106},{t:this.shape_50},{t:this.shape_51},{t:this.shape_105},{t:this.shape_103},{t:this.shape_104},{t:this.shape_95},{t:this.shape_108},{t:this.shape_44},{t:this.shape_107},{t:this.shape_100},{t:this.instance_1}]},72).wait(64));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Layer_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.keshet();
	this.instance.setTransform(262.2,140.3,0.1493,0.1888,3.9293,0,0,195.1,167);

	this.instance_1 = new lib.arrowmoving();
	this.instance_1.setTransform(233.6,181.8,0.3164,0.2847,0,-119.9963,-129.7401);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},235).wait(243));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.wronghit3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,2,132,133,162,253,308,315,338,344,355,361,411,445,479,553,618,729];
	this.streamSoundSymbolsList[0] = [{id:"backround",startFrame:0,endFrame:729,loop:1,offset:0},{id:"angryalmog1",startFrame:0,endFrame:133,loop:1,offset:0}];
	this.streamSoundSymbolsList[132] = [{id:"idea",startFrame:132,endFrame:253,loop:1,offset:0}];
	this.streamSoundSymbolsList[133] = [{id:"ahaalmog",startFrame:133,endFrame:411,loop:1,offset:0}];
	this.streamSoundSymbolsList[162] = [{id:"strech2",startFrame:162,endFrame:237,loop:1,offset:0}];
	this.streamSoundSymbolsList[253] = [{id:"mixkitcartoontoywhistle616",startFrame:253,endFrame:308,loop:1,offset:0}];
	this.streamSoundSymbolsList[308] = [{id:"hitonlineaudioconvertercom",startFrame:308,endFrame:361,loop:1,offset:0}];
	this.streamSoundSymbolsList[315] = [{id:"whistle",startFrame:315,endFrame:346,loop:1,offset:0}];
	this.streamSoundSymbolsList[338] = [{id:"fatman",startFrame:338,endFrame:437,loop:1,offset:0}];
	this.streamSoundSymbolsList[344] = [{id:"hitonlineaudioconvertercom",startFrame:344,endFrame:729,loop:1,offset:0}];
	this.streamSoundSymbolsList[355] = [{id:"backround",startFrame:355,endFrame:646,loop:1,offset:0}];
	this.streamSoundSymbolsList[361] = [{id:"fallinmp3cutnet",startFrame:361,endFrame:445,loop:1,offset:0}];
	this.streamSoundSymbolsList[411] = [{id:"suprisedalmog",startFrame:411,endFrame:553,loop:1,offset:0}];
	this.streamSoundSymbolsList[445] = [{id:"failend",startFrame:445,endFrame:730,loop:1,offset:0}];
	this.streamSoundSymbolsList[479] = [{id:"kissesman",startFrame:479,endFrame:729,loop:1,offset:0}];
	this.streamSoundSymbolsList[553] = [{id:"angryalmog2",startFrame:553,endFrame:729,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("angryalmog1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,133,1);
		var soundInstance = playSound("backround",0);
		this.InsertIntoSoundStreamData(soundInstance,0,729,1);
		this.start = this.rbuttons.start;
		var self=this; 
		self.stop();
		
		self.start.addEventListener("click",startPlaying);
		
		function startPlaying() {
		self.gotoAndPlay(1);	
			}
	}
	this.frame_2 = function() {
		this.start = undefined;
	}
	this.frame_132 = function() {
		var soundInstance = playSound("idea",0);
		this.InsertIntoSoundStreamData(soundInstance,132,253,1);
	}
	this.frame_133 = function() {
		var soundInstance = playSound("ahaalmog",0);
		this.InsertIntoSoundStreamData(soundInstance,133,411,1);
	}
	this.frame_162 = function() {
		var soundInstance = playSound("strech2",0);
		this.InsertIntoSoundStreamData(soundInstance,162,237,1);
	}
	this.frame_253 = function() {
		var soundInstance = playSound("mixkitcartoontoywhistle616",0);
		this.InsertIntoSoundStreamData(soundInstance,253,308,1);
	}
	this.frame_308 = function() {
		var soundInstance = playSound("hitonlineaudioconvertercom",0);
		this.InsertIntoSoundStreamData(soundInstance,308,361,1);
	}
	this.frame_315 = function() {
		var soundInstance = playSound("whistle",0);
		this.InsertIntoSoundStreamData(soundInstance,315,346,1);
	}
	this.frame_338 = function() {
		var soundInstance = playSound("fatman",0);
		this.InsertIntoSoundStreamData(soundInstance,338,437,1);
	}
	this.frame_344 = function() {
		var soundInstance = playSound("hitonlineaudioconvertercom",0);
		this.InsertIntoSoundStreamData(soundInstance,344,729,1);
	}
	this.frame_355 = function() {
		var soundInstance = playSound("backround",0);
		this.InsertIntoSoundStreamData(soundInstance,355,646,1);
	}
	this.frame_361 = function() {
		var soundInstance = playSound("fallinmp3cutnet",0);
		this.InsertIntoSoundStreamData(soundInstance,361,445,1);
	}
	this.frame_411 = function() {
		var soundInstance = playSound("suprisedalmog",0);
		this.InsertIntoSoundStreamData(soundInstance,411,553,1);
	}
	this.frame_445 = function() {
		var soundInstance = playSound("failend",0);
		this.InsertIntoSoundStreamData(soundInstance,445,730,1);
	}
	this.frame_479 = function() {
		var soundInstance = playSound("kissesman",0);
		this.InsertIntoSoundStreamData(soundInstance,479,729,1);
	}
	this.frame_553 = function() {
		var soundInstance = playSound("angryalmog2",0);
		this.InsertIntoSoundStreamData(soundInstance,553,729,1);
	}
	this.frame_618 = function() {
		this.replay = this.rbuttons.replay;
		var self=this;
		self.stop();
		
		self.replay.addEventListener("click",playAgain);
		
		function playAgain() {
		self.gotoAndPlay(1);	
			}
	}
	this.frame_729 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2).call(this.frame_2).wait(130).call(this.frame_132).wait(1).call(this.frame_133).wait(29).call(this.frame_162).wait(91).call(this.frame_253).wait(55).call(this.frame_308).wait(7).call(this.frame_315).wait(23).call(this.frame_338).wait(6).call(this.frame_344).wait(11).call(this.frame_355).wait(6).call(this.frame_361).wait(50).call(this.frame_411).wait(34).call(this.frame_445).wait(34).call(this.frame_479).wait(74).call(this.frame_553).wait(65).call(this.frame_618).wait(111).call(this.frame_729).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(296.75,341.35,0.9392,0.9392,0,0,0,0.1,0.1);
	this.___camera___instance.depth = 0;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(1).to({regX:0,regY:0,x:296.65,y:341.25},0).wait(66).to({scaleX:0.9251,scaleY:0.9251,x:299.3646,y:331.645},0).wait(1).to({scaleX:0.9109,scaleY:0.9109,x:302.0792,y:322.04},0).wait(1).to({scaleX:0.8968,scaleY:0.8968,x:304.7939,y:312.4349},0).wait(1).to({scaleX:0.8826,scaleY:0.8826,x:307.5085,y:302.8299},0).wait(1).to({scaleX:0.8684,scaleY:0.8684,x:310.2231,y:293.2249},0).wait(1).to({scaleX:0.8543,scaleY:0.8543,x:312.9377,y:283.6199},0).wait(1).to({scaleX:0.8401,scaleY:0.8401,x:315.6524,y:274.0149},0).wait(1).to({scaleX:0.8259,scaleY:0.8259,x:318.367,y:264.4099},0).wait(1).to({scaleX:0.8118,scaleY:0.8118,x:321.0816,y:254.8048},0).wait(1).to({scaleX:0.7976,scaleY:0.7976,x:323.7962,y:245.1998},0).wait(1).to({scaleX:0.7834,scaleY:0.7834,x:326.5109,y:235.5948},0).wait(1).to({scaleX:0.7693,scaleY:0.7693,x:329.2255,y:225.9898},0).wait(1).to({scaleX:0.7551,scaleY:0.7551,x:331.9401,y:216.3848},0).wait(1).to({scaleX:0.741,scaleY:0.741,x:334.6547,y:206.7797},0).wait(1).to({scaleX:0.7268,scaleY:0.7268,x:337.3694,y:197.1747},0).wait(1).to({scaleX:0.7126,scaleY:0.7126,x:340.084,y:187.5697},0).wait(1).to({scaleX:0.6985,scaleY:0.6985,x:342.7986,y:177.9647},0).wait(1).to({scaleX:0.6843,scaleY:0.6843,x:345.5132,y:168.3597},0).wait(1).to({scaleX:0.6701,scaleY:0.6701,x:348.2279,y:158.7546},0).wait(1).to({scaleX:0.656,scaleY:0.656,x:350.9425,y:149.1496},0).wait(1).to({scaleX:0.6418,scaleY:0.6418,x:353.6571,y:139.5446},0).wait(1).to({scaleX:0.6277,scaleY:0.6277,x:356.3717,y:129.9396},0).wait(1).to({scaleX:0.6135,scaleY:0.6135,x:359.0864,y:120.3346},0).wait(1).to({scaleX:0.5993,scaleY:0.5993,x:361.801,y:110.7296},0).wait(1).to({scaleX:0.5852,scaleY:0.5852,x:364.5156,y:101.1245},0).wait(1).to({scaleX:0.571,scaleY:0.571,x:367.2302,y:91.5195},0).wait(1).to({scaleX:0.5568,scaleY:0.5568,x:369.9449,y:81.9145},0).wait(1).to({scaleX:0.5427,scaleY:0.5427,x:372.6595,y:72.3095},0).wait(1).to({x:372.6583,y:72.3088},0).wait(1).to({x:372.6572,y:72.3081},0).wait(1).to({x:372.6561,y:72.3075},0).wait(1).to({x:372.6549,y:72.3068},0).wait(1).to({x:372.6538,y:72.3061},0).wait(1).to({x:372.6526,y:72.3054},0).wait(1).to({x:372.6515,y:72.3048},0).wait(1).to({x:372.6503,y:72.3041},0).wait(1).to({x:372.6492,y:72.3034},0).wait(1).to({x:372.6481,y:72.3027},0).wait(1).to({x:372.6469,y:72.3021},0).wait(1).to({x:372.6458,y:72.3014},0).wait(1).to({x:372.6446,y:72.3007},0).wait(1).to({x:372.6435,y:72.3},0).wait(1).to({x:372.6423,y:72.2993},0).wait(1).to({x:372.6412,y:72.2987},0).wait(1).to({x:372.64,y:72.298},0).wait(1).to({x:372.6389,y:72.2973},0).wait(1).to({x:372.6378,y:72.2966},0).wait(1).to({x:372.6366,y:72.296},0).wait(1).to({x:372.6355,y:72.2953},0).wait(1).to({x:372.6343,y:72.2946},0).wait(1).to({x:372.6332,y:72.2939},0).wait(1).to({x:372.632,y:72.2933},0).wait(1).to({x:372.6309,y:72.2926},0).wait(1).to({x:372.6298,y:72.2919},0).wait(1).to({x:372.6286,y:72.2912},0).wait(1).to({x:372.6275,y:72.2906},0).wait(1).to({x:372.6263,y:72.2899},0).wait(1).to({x:372.6252,y:72.2892},0).wait(1).to({x:372.624,y:72.2885},0).wait(1).to({x:372.6229,y:72.2879},0).wait(1).to({x:372.6218,y:72.2872},0).wait(1).to({x:372.6206,y:72.2865},0).wait(1).to({x:372.6195,y:72.2858},0).wait(1).to({x:372.6183,y:72.2852},0).wait(1).to({x:372.6172,y:72.2845},0).wait(1).to({x:372.616,y:72.2838},0).wait(1).to({x:372.6149,y:72.2831},0).wait(1).to({x:372.6138,y:72.2825},0).wait(1).to({x:372.6126,y:72.2818},0).wait(1).to({x:372.6115,y:72.2811},0).wait(1).to({x:372.6103,y:72.2804},0).wait(1).to({x:372.6092,y:72.2798},0).wait(1).to({x:372.608,y:72.2791},0).wait(1).to({x:372.6069,y:72.2784},0).wait(1).to({x:372.6058,y:72.2777},0).wait(1).to({x:372.6046,y:72.2771},0).wait(1).to({x:372.6035,y:72.2764},0).wait(1).to({x:372.6023,y:72.2757},0).wait(1).to({x:372.6012,y:72.275},0).wait(1).to({x:372.6,y:72.2743},0).wait(1).to({x:372.5989,y:72.2737},0).wait(1).to({x:372.5977,y:72.273},0).wait(1).to({x:372.5966,y:72.2723},0).wait(1).to({x:372.5955,y:72.2716},0).wait(1).to({x:372.5943,y:72.271},0).wait(1).to({x:372.5932,y:72.2703},0).wait(1).to({x:372.592,y:72.2696},0).wait(1).to({x:372.5909,y:72.2689},0).wait(1).to({x:372.5897,y:72.2683},0).wait(1).to({x:372.5886,y:72.2676},0).wait(1).to({x:372.5875,y:72.2669},0).wait(1).to({x:372.5863,y:72.2662},0).wait(1).to({x:372.5852,y:72.2656},0).wait(1).to({x:372.584,y:72.2649},0).wait(1).to({x:372.5829,y:72.2642},0).wait(1).to({x:372.5817,y:72.2635},0).wait(1).to({x:372.5806,y:72.2629},0).wait(1).to({x:372.5795,y:72.2622},0).wait(1).to({x:372.5783,y:72.2615},0).wait(1).to({x:372.5772,y:72.2608},0).wait(1).to({x:372.576,y:72.2602},0).wait(1).to({x:372.5749,y:72.2595},0).wait(1).to({regX:0.3,scaleX:0.3196,scaleY:0.3196,x:127.5,y:456.65},0).wait(1).to({regX:0,scaleX:0.3191,scaleY:0.3191,x:127.3845,y:456.775},0).wait(1).to({scaleX:0.3186,scaleY:0.3186,x:127.3691,y:456.9},0).wait(1).to({scaleX:0.3181,scaleY:0.3181,x:127.3536,y:457.025},0).wait(1).to({scaleX:0.3176,scaleY:0.3176,x:127.3381,y:457.15},0).wait(1).to({scaleX:0.3171,scaleY:0.3171,x:127.3226,y:457.275},0).wait(1).to({scaleX:0.3166,scaleY:0.3166,x:127.3072,y:457.4},0).wait(1).to({scaleX:0.3161,scaleY:0.3161,x:127.2917,y:457.525},0).wait(1).to({scaleX:0.3156,scaleY:0.3156,x:127.2762,y:457.65},0).wait(1).to({scaleX:0.3151,scaleY:0.3151,x:127.2607,y:457.775},0).wait(1).to({scaleX:0.3146,scaleY:0.3146,x:127.2453,y:457.9},0).wait(1).to({scaleX:0.3141,scaleY:0.3141,x:127.2298,y:458.025},0).wait(1).to({scaleX:0.3135,scaleY:0.3135,x:127.2143,y:458.15},0).wait(1).to({scaleX:0.313,scaleY:0.313,x:127.1988,y:458.275},0).wait(1).to({scaleX:0.3125,scaleY:0.3125,x:127.1834,y:458.4},0).wait(1).to({scaleX:0.312,scaleY:0.312,x:127.1679,y:458.525},0).wait(1).to({scaleX:0.3115,scaleY:0.3115,x:127.1524,y:458.65},0).wait(1).to({scaleX:0.311,scaleY:0.311,x:127.137,y:458.775},0).wait(1).to({scaleX:0.3105,scaleY:0.3105,x:127.1215,y:458.9},0).wait(1).to({scaleX:0.31,scaleY:0.31,x:127.106,y:459.025},0).wait(1).to({scaleX:0.3095,scaleY:0.3095,x:127.0905,y:459.15},0).wait(1).to({scaleX:0.309,scaleY:0.309,x:127.0751,y:459.275},0).wait(1).to({scaleX:0.3085,scaleY:0.3085,x:127.0596,y:459.4},0).wait(1).to({scaleX:0.308,scaleY:0.308,x:127.0441,y:459.525},0).wait(1).to({scaleX:0.3075,scaleY:0.3075,x:127.0286,y:459.65},0).wait(1).to({scaleX:0.307,scaleY:0.307,x:127.0132,y:459.775},0).wait(1).to({scaleX:0.3065,scaleY:0.3065,x:126.9977,y:459.9},0).wait(1).to({scaleX:0.306,scaleY:0.306,x:126.9822,y:460.025},0).wait(1).to({scaleX:0.3054,scaleY:0.3054,x:126.9668,y:460.15},0).wait(1).to({scaleX:0.3049,scaleY:0.3049,x:126.9513,y:460.275},0).wait(1).to({scaleX:0.3044,scaleY:0.3044,x:126.9358,y:460.4},0).wait(1).to({scaleX:0.3039,scaleY:0.3039,x:126.9203,y:460.525},0).wait(1).to({scaleX:0.3034,scaleY:0.3034,x:126.9049,y:460.65},0).wait(1).to({scaleX:0.3024,scaleY:0.3024,x:126.7097,y:460.6924},0).wait(1).to({scaleX:0.3015,scaleY:0.3015,x:126.5145,y:460.7348},0).wait(1).to({scaleX:0.3005,scaleY:0.3005,x:126.3194,y:460.7773},0).wait(1).to({scaleX:0.2995,scaleY:0.2995,x:126.1242,y:460.8197},0).wait(1).to({scaleX:0.2985,scaleY:0.2985,x:125.9291,y:460.8621},0).wait(1).to({scaleX:0.2975,scaleY:0.2975,x:125.7339,y:460.9045},0).wait(1).to({scaleX:0.2966,scaleY:0.2966,x:125.5387,y:460.947},0).wait(1).to({scaleX:0.2956,scaleY:0.2956,x:125.3436,y:460.9894},0).wait(1).to({scaleX:0.2946,scaleY:0.2946,x:125.1484,y:461.0318},0).wait(1).to({scaleX:0.2936,scaleY:0.2936,x:124.9533,y:461.0742},0).wait(1).to({scaleX:0.2927,scaleY:0.2927,x:124.7581,y:461.1167},0).wait(1).to({scaleX:0.2917,scaleY:0.2917,x:124.5629,y:461.1591},0).wait(1).to({scaleX:0.2907,scaleY:0.2907,x:124.3678,y:461.2015},0).wait(1).to({scaleX:0.2897,scaleY:0.2897,x:124.1726,y:461.2439},0).wait(1).to({scaleX:0.2887,scaleY:0.2887,x:123.9774,y:461.2864},0).wait(1).to({scaleX:0.2878,scaleY:0.2878,x:123.7823,y:461.3288},0).wait(1).to({scaleX:0.2868,scaleY:0.2868,x:123.5871,y:461.3712},0).wait(1).to({scaleX:0.2858,scaleY:0.2858,x:123.392,y:461.4136},0).wait(1).to({scaleX:0.2848,scaleY:0.2848,x:123.1968,y:461.4561},0).wait(1).to({scaleX:0.2838,scaleY:0.2838,x:123.0016,y:461.4985},0).wait(1).to({scaleX:0.2829,scaleY:0.2829,x:122.8065,y:461.5409},0).wait(1).to({scaleX:0.2819,scaleY:0.2819,x:122.6113,y:461.5833},0).wait(1).to({scaleX:0.2809,scaleY:0.2809,x:122.4162,y:461.6258},0).wait(1).to({scaleX:0.2799,scaleY:0.2799,x:122.221,y:461.6682},0).wait(1).to({scaleX:0.2789,scaleY:0.2789,x:122.0258,y:461.7106},0).wait(1).to({scaleX:0.278,scaleY:0.278,x:121.8307,y:461.753},0).wait(1).to({scaleX:0.277,scaleY:0.277,x:121.6355,y:461.7955},0).wait(1).to({scaleX:0.276,scaleY:0.276,x:121.4404,y:461.8379},0).wait(1).to({scaleX:0.275,scaleY:0.275,x:121.2452,y:461.8803},0).wait(1).to({scaleX:0.2741,scaleY:0.2741,x:121.05,y:461.9227},0).wait(1).to({scaleX:0.2731,scaleY:0.2731,x:120.8549,y:461.9652},0).wait(1).to({scaleX:0.2721,scaleY:0.2721,x:120.6597,y:462.0076},0).wait(1).to({scaleX:0.2711,scaleY:0.2711,x:120.4646,y:462.05},0).wait(2).to({regX:0.3,scaleX:0.3344,scaleY:0.3344,x:264.65,y:94.15},0).wait(1).to({regX:0,scaleX:0.3345,scaleY:0.3345,x:264.55},0).wait(31).to({scaleX:0.3375,scaleY:0.3375,x:258.5787,y:105.3704},0).wait(1).to({scaleX:0.3405,scaleY:0.3405,x:252.6074,y:116.5907},0).wait(1).to({scaleX:0.3436,scaleY:0.3436,x:246.6361,y:127.8111},0).wait(1).to({scaleX:0.3466,scaleY:0.3466,x:240.6649,y:139.0315},0).wait(1).to({scaleX:0.3497,scaleY:0.3497,x:234.6936,y:150.2519},0).wait(1).to({scaleX:0.3527,scaleY:0.3527,x:228.7223,y:161.4722},0).wait(1).to({scaleX:0.3557,scaleY:0.3557,x:222.751,y:172.6926},0).wait(1).to({scaleX:0.3588,scaleY:0.3588,x:216.7797,y:183.913},0).wait(1).to({scaleX:0.3618,scaleY:0.3618,x:210.8085,y:195.1333},0).wait(1).to({scaleX:0.3649,scaleY:0.3649,x:204.8372,y:206.3537},0).wait(1).to({scaleX:0.3679,scaleY:0.3679,x:198.8659,y:217.5741},0).wait(1).to({scaleX:0.3709,scaleY:0.3709,x:192.8946,y:228.7944},0).wait(1).to({scaleX:0.374,scaleY:0.374,x:186.9233,y:240.0148},0).wait(1).to({scaleX:0.377,scaleY:0.377,x:180.952,y:251.2352},0).wait(1).to({scaleX:0.3801,scaleY:0.3801,x:174.9808,y:262.4556},0).wait(1).to({scaleX:0.3831,scaleY:0.3831,x:169.0095,y:273.6759},0).wait(1).to({scaleX:0.3862,scaleY:0.3862,x:163.0382,y:284.8963},0).wait(1).to({scaleX:0.3892,scaleY:0.3892,x:157.0669,y:296.1167},0).wait(1).to({scaleX:0.3922,scaleY:0.3922,x:151.0956,y:307.337},0).wait(1).to({scaleX:0.3953,scaleY:0.3953,x:145.1243,y:318.5574},0).wait(1).to({scaleX:0.3983,scaleY:0.3983,x:139.1531,y:329.7778},0).wait(1).to({scaleX:0.4014,scaleY:0.4014,x:133.1818,y:340.9981},0).wait(1).to({scaleX:0.4044,scaleY:0.4044,x:127.2105,y:352.2185},0).wait(1).to({scaleX:0.4074,scaleY:0.4074,x:121.2392,y:363.4389},0).wait(1).to({scaleX:0.4105,scaleY:0.4105,x:115.2679,y:374.6593},0).wait(1).to({scaleX:0.4135,scaleY:0.4135,x:109.2966,y:385.8796},0).wait(1).to({scaleX:0.4166,scaleY:0.4166,x:103.3254,y:397.1},0).wait(1).to({scaleX:0.3877,scaleY:0.3877,x:96.859,y:404.675},0).wait(1).to({scaleX:0.3588,scaleY:0.3588,x:90.3927,y:412.25},0).wait(1).to({scaleX:0.3299,scaleY:0.3299,x:83.9264,y:419.825},0).wait(1).to({scaleX:0.301,scaleY:0.301,x:77.46,y:427.4},0).wait(10).to({scaleX:0.3124,scaleY:0.3124,x:69.1888,y:430.6357},0).wait(1).to({scaleX:0.3237,scaleY:0.3237,x:60.9175,y:433.8714},0).wait(1).to({scaleX:0.3351,scaleY:0.3351,x:52.6462,y:437.1071},0).wait(1).to({scaleX:0.3464,scaleY:0.3464,x:44.375,y:440.3429},0).wait(1).to({scaleX:0.3578,scaleY:0.3578,x:36.1037,y:443.5786},0).wait(1).to({scaleX:0.3691,scaleY:0.3691,x:27.8325,y:446.8143},0).wait(1).to({scaleX:0.3805,scaleY:0.3805,x:19.5612,y:450.05},0).wait(1).to({scaleX:0.3918,scaleY:0.3918,x:11.2899,y:453.2857},0).wait(1).to({scaleX:0.4031,scaleY:0.4031,x:3.0187,y:456.5214},0).wait(1).to({scaleX:0.4145,scaleY:0.4145,x:-5.2526,y:459.7571},0).wait(1).to({scaleX:0.4258,scaleY:0.4258,x:-13.5238,y:462.9929},0).wait(1).to({scaleX:0.4372,scaleY:0.4372,x:-21.7951,y:466.2286},0).wait(1).to({scaleX:0.4485,scaleY:0.4485,x:-30.0664,y:469.4643},0).wait(1).to({scaleX:0.4599,scaleY:0.4599,x:-38.3376,y:472.7},0).wait(1).to({scaleX:0.4644,scaleY:0.4644,x:-52.4928,y:472.0615},0).wait(1).to({scaleX:0.4689,scaleY:0.4689,x:-66.648,y:471.4231},0).wait(1).to({scaleX:0.4734,scaleY:0.4734,x:-80.8032,y:470.7846},0).wait(1).to({scaleX:0.4779,scaleY:0.4779,x:-94.9584,y:470.1462},0).wait(1).to({scaleX:0.4825,scaleY:0.4825,x:-109.1136,y:469.5077},0).wait(1).to({scaleX:0.487,scaleY:0.487,x:-123.2688,y:468.8692},0).wait(1).to({scaleX:0.4915,scaleY:0.4915,x:-137.424,y:468.2308},0).wait(1).to({scaleX:0.496,scaleY:0.496,x:-151.5792,y:467.5923},0).wait(1).to({scaleX:0.5005,scaleY:0.5005,x:-165.7344,y:466.9538},0).wait(1).to({scaleX:0.5051,scaleY:0.5051,x:-179.8896,y:466.3154},0).wait(1).to({scaleX:0.5096,scaleY:0.5096,x:-194.0448,y:465.6769},0).wait(1).to({scaleX:0.5141,scaleY:0.5141,x:-208.2001,y:465.0385},0).wait(1).to({scaleX:0.5186,scaleY:0.5186,x:-222.3553,y:464.4},0).wait(76).to({scaleX:0.5364,scaleY:0.5364,x:-202.0272,y:429.3722},0).wait(1).to({scaleX:0.5541,scaleY:0.5541,x:-181.6992,y:394.3444},0).wait(1).to({scaleX:0.5719,scaleY:0.5719,x:-161.3712,y:359.3167},0).wait(1).to({scaleX:0.5896,scaleY:0.5896,x:-141.0432,y:324.2889},0).wait(1).to({scaleX:0.6074,scaleY:0.6074,x:-120.7152,y:289.2611},0).wait(1).to({scaleX:0.6251,scaleY:0.6251,x:-100.3872,y:254.2333},0).wait(1).to({scaleX:0.6429,scaleY:0.6429,x:-80.0592,y:219.2056},0).wait(1).to({scaleX:0.6606,scaleY:0.6606,x:-59.7312,y:184.1778},0).wait(1).to({scaleX:0.6784,scaleY:0.6784,x:-39.4032,y:149.15},0).wait(39).to({scaleX:0.6806,scaleY:0.6806,x:-42.0093,y:154.5011},0).wait(1).to({scaleX:0.6829,scaleY:0.6829,x:-44.6154,y:159.8522},0).wait(1).to({scaleX:0.6851,scaleY:0.6851,x:-47.2215,y:165.2033},0).wait(1).to({scaleX:0.6874,scaleY:0.6874,x:-49.8277,y:170.5544},0).wait(1).to({scaleX:0.6896,scaleY:0.6896,x:-52.4338,y:175.9054},0).wait(1).to({scaleX:0.6918,scaleY:0.6918,x:-55.0399,y:181.2565},0).wait(1).to({scaleX:0.6941,scaleY:0.6941,x:-57.646,y:186.6076},0).wait(1).to({scaleX:0.6963,scaleY:0.6963,x:-60.2521,y:191.9587},0).wait(1).to({scaleX:0.6986,scaleY:0.6986,x:-62.8582,y:197.3098},0).wait(1).to({scaleX:0.7008,scaleY:0.7008,x:-65.4644,y:202.6609},0).wait(1).to({scaleX:0.7031,scaleY:0.7031,x:-68.0705,y:208.012},0).wait(1).to({scaleX:0.7053,scaleY:0.7053,x:-70.6766,y:213.3631},0).wait(1).to({scaleX:0.7076,scaleY:0.7076,x:-73.2827,y:218.7142},0).wait(1).to({scaleX:0.7098,scaleY:0.7098,x:-75.8888,y:224.0652},0).wait(1).to({scaleX:0.712,scaleY:0.712,x:-78.4949,y:229.4163},0).wait(1).to({scaleX:0.7143,scaleY:0.7143,x:-81.1011,y:234.7674},0).wait(1).to({scaleX:0.7165,scaleY:0.7165,x:-83.7072,y:240.1185},0).wait(1).to({scaleX:0.7188,scaleY:0.7188,x:-86.3133,y:245.4696},0).wait(1).to({scaleX:0.721,scaleY:0.721,x:-88.9194,y:250.8207},0).wait(1).to({scaleX:0.7233,scaleY:0.7233,x:-91.5255,y:256.1718},0).wait(1).to({scaleX:0.7255,scaleY:0.7255,x:-94.1316,y:261.5229},0).wait(1).to({scaleX:0.7277,scaleY:0.7277,x:-96.7378,y:266.874},0).wait(1).to({scaleX:0.73,scaleY:0.73,x:-99.3439,y:272.225},0).wait(1).to({scaleX:0.7322,scaleY:0.7322,x:-101.95,y:277.5761},0).wait(1).to({scaleX:0.7345,scaleY:0.7345,x:-104.5561,y:282.9272},0).wait(1).to({scaleX:0.7367,scaleY:0.7367,x:-107.1622,y:288.2783},0).wait(1).to({scaleX:0.739,scaleY:0.739,x:-109.7684,y:293.6294},0).wait(1).to({scaleX:0.7412,scaleY:0.7412,x:-112.3745,y:298.9805},0).wait(1).to({scaleX:0.7434,scaleY:0.7434,x:-114.9806,y:304.3316},0).wait(1).to({scaleX:0.7457,scaleY:0.7457,x:-117.5867,y:309.6827},0).wait(1).to({scaleX:0.7479,scaleY:0.7479,x:-120.1928,y:315.0338},0).wait(1).to({scaleX:0.7502,scaleY:0.7502,x:-122.7989,y:320.3848},0).wait(1).to({scaleX:0.7524,scaleY:0.7524,x:-125.4051,y:325.7359},0).wait(1).to({scaleX:0.7547,scaleY:0.7547,x:-128.0112,y:331.087},0).wait(1).to({scaleX:0.7569,scaleY:0.7569,x:-130.6173,y:336.4381},0).wait(1).to({scaleX:0.7591,scaleY:0.7591,x:-133.2234,y:341.7892},0).wait(1).to({scaleX:0.7614,scaleY:0.7614,x:-135.8295,y:347.1403},0).wait(1).to({scaleX:0.7636,scaleY:0.7636,x:-138.4356,y:352.4914},0).wait(1).to({scaleX:0.7659,scaleY:0.7659,x:-141.0418,y:357.8425},0).wait(1).to({scaleX:0.7681,scaleY:0.7681,x:-143.6479,y:363.1936},0).wait(1).to({scaleX:0.7704,scaleY:0.7704,x:-146.254,y:368.5446},0).wait(1).to({scaleX:0.7726,scaleY:0.7726,x:-148.8601,y:373.8957},0).wait(1).to({scaleX:0.7748,scaleY:0.7748,x:-151.4662,y:379.2468},0).wait(1).to({scaleX:0.7771,scaleY:0.7771,x:-154.0723,y:384.5979},0).wait(1).to({scaleX:0.7793,scaleY:0.7793,x:-156.6785,y:389.949},0).wait(51).to({scaleX:0.7999,scaleY:0.7999,x:-148.8775,y:377.5419},0).wait(1).to({scaleX:0.8205,scaleY:0.8205,x:-141.0765,y:365.1347},0).wait(1).to({scaleX:0.8411,scaleY:0.8411,x:-133.2756,y:352.7276},0).wait(1).to({scaleX:0.8617,scaleY:0.8617,x:-125.4746,y:340.3204},0).wait(1).to({scaleX:0.8823,scaleY:0.8823,x:-117.6736,y:327.9133},0).wait(1).to({scaleX:0.9029,scaleY:0.9029,x:-109.8727,y:315.5061},0).wait(1).to({scaleX:0.9235,scaleY:0.9235,x:-102.0717,y:303.099},0).wait(1).to({scaleX:0.9074,scaleY:0.9074,x:-97.6526,y:293.7752},0).wait(1).to({scaleX:0.8914,scaleY:0.8914,x:-93.2335,y:284.4514},0).wait(1).to({scaleX:0.8754,scaleY:0.8754,x:-88.8144,y:275.1276},0).wait(1).to({scaleX:0.8593,scaleY:0.8593,x:-84.3953,y:265.8038},0).wait(1).to({scaleX:0.8433,scaleY:0.8433,x:-79.9762,y:256.48},0).wait(1).to({scaleX:0.8272,scaleY:0.8272,x:-75.5571,y:247.1561},0).wait(1).to({scaleX:0.8112,scaleY:0.8112,x:-71.138,y:237.8323},0).wait(1).to({scaleX:0.7951,scaleY:0.7951,x:-66.7189,y:228.5085},0).wait(1).to({scaleX:0.7791,scaleY:0.7791,x:-62.2998,y:219.1847},0).wait(1).to({scaleX:0.763,scaleY:0.763,x:-57.8807,y:209.8609},0).wait(1).to({scaleX:0.747,scaleY:0.747,x:-53.4616,y:200.5371},0).wait(1).to({scaleX:0.7309,scaleY:0.7309,x:-49.0425,y:191.2133},0).wait(1).to({scaleX:0.7149,scaleY:0.7149,x:-44.6234,y:181.8895},0).wait(1).to({scaleX:0.6988,scaleY:0.6988,x:-40.2043,y:172.5657},0).wait(1).to({scaleX:0.6828,scaleY:0.6828,x:-35.7852,y:163.2419},0).wait(1).to({scaleX:0.6667,scaleY:0.6667,x:-31.3661,y:153.918},0).wait(1).to({scaleX:0.6507,scaleY:0.6507,x:-26.947,y:144.5942},0).wait(1).to({scaleX:0.6346,scaleY:0.6346,x:-22.5279,y:135.2704},0).wait(1).to({scaleX:0.6186,scaleY:0.6186,x:-18.1088,y:125.9466},0).wait(1).to({scaleX:0.6025,scaleY:0.6025,x:-13.6897,y:116.6228},0).wait(1).to({scaleX:0.5865,scaleY:0.5865,x:-9.2706,y:107.299},0).wait(39).to({_off:true},1).wait(111));

	// rbuttons_obj_
	this.rbuttons = new lib.Scene_1_rbuttons();
	this.rbuttons.name = "rbuttons";
	this.rbuttons.setTransform(282.2,327.4,1.0647,1.0647,0,0,0,279.9,366.9);
	this.rbuttons.depth = 0;
	this.rbuttons.isAttachedToCamera = 0
	this.rbuttons.isAttachedToMask = 0
	this.rbuttons.layerDepth = 0
	this.rbuttons.layerIndex = 0
	this.rbuttons.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.rbuttons).wait(2).to({y:327.45},0).wait(616).to({regX:-19.7,regY:123.5,scaleX:1.7051,scaleY:1.7051,x:282.1},0).to({_off:true},2).wait(110));

	// מטרה_obj_
	this.מטרה = new lib.Scene_1_מטרה();
	this.מטרה.name = "מטרה";
	this.מטרה.setTransform(-0.05,0,1.0647,1.0647,0,0,0,14.8,59.4);
	this.מטרה.depth = 0;
	this.מטרה.isAttachedToCamera = 0
	this.מטרה.isAttachedToMask = 0
	this.מטרה.layerDepth = 0
	this.מטרה.layerIndex = 1
	this.מטרה.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.מטרה).wait(167).to({regX:209.8,regY:-90.5,scaleX:1.8428,scaleY:1.8428,x:0.1},0).wait(3).to({regX:31.7,regY:361,scaleX:3.1339,scaleY:3.1339,x:0.2,y:0.05},0).wait(3).to({regX:32,regY:361.9,scaleX:3.1488,scaleY:3.1488,x:-0.15,y:0.2},0).wait(5).to({regX:32.8,regY:363.2,scaleX:3.1741,scaleY:3.1741,x:0,y:0.05},0).wait(26).to({regX:36.2,regY:370.6,scaleX:3.3282,scaleY:3.3282,x:0.05},0).wait(31).to({regX:39.1,regY:380.7,scaleX:3.6888,scaleY:3.6888,x:-0.15},0).wait(1).to({regX:164.2,regY:-6.2,scaleX:2.9901,scaleY:2.9901,x:0,y:-0.2},0).wait(23).to({regY:-6,scaleX:2.9902,scaleY:2.9902,x:0.05,y:0.1},0).to({_off:true},62).wait(409));

	// Layer_6_obj_
	this.Layer_6 = new lib.Scene_1_Layer_6();
	this.Layer_6.name = "Layer_6";
	this.Layer_6.setTransform(-0.05,0,1.0647,1.0647,0,0,0,14.8,59.4);
	this.Layer_6.depth = 0;
	this.Layer_6.isAttachedToCamera = 0
	this.Layer_6.isAttachedToMask = 0
	this.Layer_6.layerDepth = 0
	this.Layer_6.layerIndex = 2
	this.Layer_6.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_6).wait(228).to({regX:38.6,regY:378.7,scaleX:3.6106,scaleY:3.6106,x:0.2,y:0.2},0).wait(119).to({regX:-377.9,regY:308.9,scaleX:1.9283,scaleY:1.9283,x:-0.05,y:0.05},0).wait(135).to({regX:-328.1,regY:67.3,scaleX:1.3574,scaleY:1.3574,x:0,y:-0.05},0).wait(72).to({regX:-385.5,regY:100.5,scaleX:1.1889,scaleY:1.1889,y:0.1},0).to({_off:true},64).wait(112));

	// Layer_2_obj_
	this.Layer_2 = new lib.Scene_1_Layer_2();
	this.Layer_2.name = "Layer_2";
	this.Layer_2.setTransform(-0.05,0,1.0647,1.0647,0,0,0,14.8,59.4);
	this.Layer_2.depth = 0;
	this.Layer_2.isAttachedToCamera = 0
	this.Layer_2.isAttachedToMask = 0
	this.Layer_2.layerDepth = 0
	this.Layer_2.layerIndex = 3
	this.Layer_2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_2).wait(235).to({regX:39.1,regY:380.7,scaleX:3.6888,scaleY:3.6888,x:-0.15,y:0.05},0).to({_off:true},243).wait(252));

	// אלמנטים_obj_
	this.אלמנטים = new lib.Scene_1_אלמנטים();
	this.אלמנטים.name = "אלמנטים";
	this.אלמנטים.setTransform(336.7,283.5,1.0647,1.0647,0,0,0,331.1,325.7);
	this.אלמנטים.depth = 0;
	this.אלמנטים.isAttachedToCamera = 0
	this.אלמנטים.isAttachedToMask = 0
	this.אלמנטים.layerDepth = 0
	this.אלמנטים.layerIndex = 4
	this.אלמנטים.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.אלמנטים).wait(44).to({y:283.55},0).wait(76).to({regX:392.5,regY:63.4,scaleX:1.8428,scaleY:1.8428,y:283.6},0).wait(83).to({regX:137.6,regY:455.7,scaleX:3.3174,scaleY:3.3174,x:336.6,y:283.5},0).wait(27).to({regX:131.3,regY:457.3,scaleX:3.6362,scaleY:3.6362,x:336.55,y:283.45},0).wait(10).to({regX:276.8,regY:88.8,scaleX:2.9902,scaleY:2.9902,x:336.75,y:283.6},0).wait(28).to({regX:270.9,regY:99.8,scaleX:2.9632,scaleY:2.9632,x:336.6},0).wait(4).to({regX:247.5,regY:144.5,scaleX:2.8601,scaleY:2.8601,x:336.65,y:283.5},0).wait(4).to({regX:224.1,regY:189.1,scaleX:2.7639,scaleY:2.7639,x:336.8,y:283.45},0).wait(4).to({regX:200.7,regY:233.8,scaleX:2.6741,scaleY:2.6741,x:336.85,y:283.35},0).wait(4).to({regX:177.2,regY:278.4,scaleX:2.5897,scaleY:2.5897,x:336.7},0).wait(4).to({regX:153.8,regY:323.2,scaleX:2.5107,scaleY:2.5107,y:283.5},0).wait(4).to({regX:130.3,regY:367.9,scaleX:2.4363,scaleY:2.4363,x:336.55,y:283.35},0).wait(3).to({regX:111.1,regY:398.3,scaleX:2.5795,scaleY:2.5795,x:336.6,y:283.55},0).wait(5).to({regX:88.5,regY:422.5,scaleX:3.322,scaleY:3.322,x:336.65},0).wait(8).to({regX:80.7,regY:425.5,scaleX:3.2014,scaleY:3.2014,x:336.6,y:283.5},0).wait(14).to({regX:-35.5,regY:464.4,scaleX:2.1534,scaleY:2.1534,x:336.55,y:283.4},0).wait(3).to({regX:-77.4,regY:462.2,scaleX:2.0924,scaleY:2.0924,x:336.65,y:283.35},0).wait(3).to({regX:-119.4,regY:460.2,scaleX:2.0346,scaleY:2.0346,x:336.5,y:283.65},0).wait(3).to({regX:-161.2,regY:458,scaleX:1.9801,scaleY:1.9801,x:336.75,y:283.45},0).wait(3).to({regX:-203.3,regY:455.9,scaleX:1.9283,scaleY:1.9283,x:336.65,y:283.5},0).wait(93).to({regX:-14.5,regY:138.1,scaleX:1.4741,scaleY:1.4741,x:336.7},0).wait(129).to({regX:-85.3,regY:313.4,scaleX:1.1334,scaleY:1.1334,x:336.65},0).to({_off:true},64).wait(110));

	// אנשים_obj_
	this.אנשים = new lib.Scene_1_אנשים();
	this.אנשים.name = "אנשים";
	this.אנשים.setTransform(306.6,278,1.0647,1.0647,0,0,0,302.8,320.5);
	this.אנשים.depth = 0;
	this.אנשים.isAttachedToCamera = 0
	this.אנשים.isAttachedToMask = 0
	this.אנשים.layerDepth = 0
	this.אנשים.layerIndex = 5
	this.אנשים.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.אנשים).wait(120).to({regX:376.2,regY:60.4,scaleX:1.8428,scaleY:1.8428,x:306.65,y:278.05},0).wait(38).to({regX:376.1,x:306.55},0).wait(45).to({regX:128.6,regY:454.1,scaleX:3.3174,scaleY:3.3174,x:306.7,y:278.2},0).wait(206).to({regX:-218.9,regY:453.1,scaleX:1.9283,scaleY:1.9283,x:306.55,y:278.1},0).wait(147).to({regX:-111.9,regY:308.6,scaleX:1.1334,scaleY:1.1334,x:306.5,y:278.05},0).to({_off:true},64).wait(110));

	// חלונות_בסיס_obj_
	this.חלונות_בסיס = new lib.Scene_1_חלונות_בסיס();
	this.חלונות_בסיס.name = "חלונות_בסיס";
	this.חלונות_בסיס.setTransform(308.7,301.3,1.0647,1.0647,0,0,0,304.8,342.4);
	this.חלונות_בסיס.depth = 0;
	this.חלונות_בסיס.isAttachedToCamera = 0
	this.חלונות_בסיס.isAttachedToMask = 0
	this.חלונות_בסיס.layerDepth = 0
	this.חלונות_בסיס.layerIndex = 6
	this.חלונות_בסיס.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.חלונות_בסיס).wait(157).to({regX:377.2,regY:73,scaleX:1.8428,scaleY:1.8428,x:308.6,y:301.25},0).wait(45).to({regX:129.4,regY:461,scaleX:3.3067,scaleY:3.3067,x:308.7},0).wait(206).to({regX:-217.8,regY:465.1,scaleX:1.9283,scaleY:1.9283,y:301.2},0).to({_off:true},211).wait(111));

	// רקע_בניין_obj_
	this.רקע_בניין = new lib.Scene_1_רקע_בניין();
	this.רקע_בניין.name = "רקע_בניין";
	this.רקע_בניין.setTransform(373.65,1174.45,1.0647,1.0647,0,0,0,365.8,1162.5);
	this.רקע_בניין.depth = 0;
	this.רקע_בניין.isAttachedToCamera = 0
	this.רקע_בניין.isAttachedToMask = 0
	this.רקע_בניין.layerDepth = 0
	this.רקע_בניין.layerIndex = 7
	this.רקע_בניין.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.רקע_בניין).wait(202).to({regX:149.1,regY:725.1,scaleX:3.3067,scaleY:3.3067,x:373.85,y:1174.55},0).to({_off:true},417).wait(111));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-356.2,0,1757.8,2436.8);
// library properties:
lib.properties = {
	id: '42351C265AC2FE47A16984C6ED4B3D40',
	width: 600,
	height: 600,
	fps: 30,
	color: "#FF66CC",
	opacity: 1.00,
	manifest: [
		{src:"images/wrong hit_atlas_1.png?1617879508684", id:"wrong hit_atlas_1"},
		{src:"sounds/ahaalmog.mp3?1617879508862", id:"ahaalmog"},
		{src:"sounds/angryalmog1.mp3?1617879508862", id:"angryalmog1"},
		{src:"sounds/angryalmog2.mp3?1617879508862", id:"angryalmog2"},
		{src:"sounds/backround.mp3?1617879508862", id:"backround"},
		{src:"sounds/failend.mp3?1617879508862", id:"failend"},
		{src:"sounds/fallinmp3cutnet.mp3?1617879508862", id:"fallinmp3cutnet"},
		{src:"sounds/fatman.mp3?1617879508862", id:"fatman"},
		{src:"sounds/hitonlineaudioconvertercom.mp3?1617879508862", id:"hitonlineaudioconvertercom"},
		{src:"sounds/idea.mp3?1617879508862", id:"idea"},
		{src:"sounds/kissesman.mp3?1617879508862", id:"kissesman"},
		{src:"sounds/mixkitcartoontoywhistle616.mp3?1617879508862", id:"mixkitcartoontoywhistle616"},
		{src:"sounds/strech2.mp3?1617879508862", id:"strech2"},
		{src:"sounds/suprisedalmog.mp3?1617879508862", id:"suprisedalmog"},
		{src:"sounds/whistle.mp3?1617879508862", id:"whistle"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['42351C265AC2FE47A16984C6ED4B3D40'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;