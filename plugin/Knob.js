/**
 * This plugin adds a knob functionality to an image.
 */
Ext.define('Ext.plugin.Knob', {
    extend: 'Ext.Component',

    config: {
        /*
         * @cfg {Number} knobValue The value set for the knob.
         * When the sectorCount is 360, knobValue can be between 0 and 360.
         * When sectorCount is less than 360, the knob value must be between 1 and the sectorCount.
         * @accessor
         */
        knobValue: 0,

        /*
         * @cfg {Number} sectorCount Number of sectors the circle should be divided into.
         * The default is 360.
         * The value must be 0 > x <= 360.
         * @accessor
         */
        sectorCount: 360,
        
        /*
         * @cfg {Number} sectorThreshold This specifies a range in which the knob should snap to the nearest sector point.
         * The default is 10.
         * So if 45 is a sector point. The knob will snap when it reach a angle between 35 and 55.
         * @accessor
         */
        sectorThreshold: 10,
        
        /*
         * @cfg {Number} arcAngle The arc range in degree in which the knob will rotate.
         * The value must be 0 > x < 360.
         * @accessor
         */
        arcAngle: null,
        
        /*
         * @cfg {Number} arcOffset This spectifies the offset in whoch the arc should begin.
         * Default value is 0.
         * The value must be 0 > x < 360.
         * @accessor
         */
        arcOffset: 0
    },
    
    image: null,
    
    imageTopPosition: 0,
    
    imageLeftPosition: 0,
    
    imageCenterX: 0,
    
    imageCenterY: 0,
    
    knobAngle: 0,   

    init: function(image) {
        if((this.getKnobValue() === 0) && (this.getSectorCount() !== 360)){
            this.setKnobValue(1);    
        }
        
        this.image = image ;
        
        image.setStyle('background-color:transparent');
        
        image.element.on({
            touchstart: 'onTouchStart',
            touchmove: 'onTouchMove',
            scope: this
        });
    },
    
    getInitialValues: function(imageEl){
        var box = imageEl.dom.getBoundingClientRect(),
            round = Math.round,
            xCenter = round((round(box.left)+round(box.right))/2),
            yCenter = round((round(box.top)+round(box.bottom))/2),
            xPos = round(xCenter - (box.width/2)),
            yPos = round(yCenter - (box.height/2));
        this.imageTopPosition  = yPos,
        this.imageLeftPosition = xPos,
        this.imageCenterX = xCenter,
        this.imageCenterY = yCenter;        
        this.setKnobValue(this.getKnobValue());    
    },
    
    onTouchStart: function(event, element, options, eOpts) {
        event.stopEvent();
        this.getInitialValues(this.image.element);
        this.rotateKnob(event);
    },
    
    onTouchMove: function(event, element, options, eOpts) {
        event.stopEvent();
        this.rotateKnob(event);
    },
    
    applyKnobValue: function(knobValue){
        if(this.image !== null){
            if(this.getSectorCount() != 360){
                this.knobAngle = ((360/this.getSectorCount())*(knobValue-1)) + ((360/this.getSectorCount())/2);                            
            } else {
                this.knobAngle = knobValue;
            }
            
            if(this.getArcAngle() != null){
                this.knobAngle += this.getArcOffset();
            }
            this.image.setStyle('-webkit-transform:rotate('+Math.round(this.knobAngle)+'deg)');
            this.image.fireEvent('turn',this.knobAngle,knobValue);
        }
        return knobValue;
    },
    
    rotateKnob: function(event){
        //Used to find if the click event is on the element.
        if( (event.pageX < this.imageLeftPosition) || (event.pageX > this.imageLeftPosition + this.image.getWidth())
                || (event.pageY < this.imageTopPosition) || (event.pageY > this.imageTopPosition + this.image.getHeight()) ){
            return false;
        }
        
        //Hold current knob angle value in case the knob does not rotate to another sector.
        currentKnob = this.knobAngle;
        
        pointX = event.pageX,
        pointY = event.pageY,
        deltaY = pointY - this.imageCenterY,
        deltaX = pointX - this.imageCenterX,
        angleInDegrees = Math.round(Math.atan2(deltaY, deltaX) * (180/Math.PI)),
        rotationAngle = angleInDegrees + 90;
        if(rotationAngle < 0){
            rotationAngle += 360;
        }
        
        var rotationCheck = true;
        var value = rotationAngle;
        this.knobAngle = rotationAngle;
        
        if(this.getSectorCount() != 360){
            result = this.isRotate(rotationAngle,currentKnob);
            rotationCheck = result.isRotate;
            value = result.value;
        } else if(this.getArcAngle() !=null){
            rotationCheck = this.isArcRotate(rotationAngle);
            value -= this.getArcOffset();
        }
        
        if(rotationCheck){
            this.setKnobValue(value);
        } else {
            this.knobAngle = currentKnob;
        }
        return true;
    },
    
    //This check will make sure the knob will only rotate when the knob meets a sector point.
    isRotate: function(angle,prevAngle){
        quadAngle       = 360/this.getSectorCount();
        quadCenterAngle = quadAngle/2;
        for(i=0;i<this.getSectorCount();i++){
            sectorAngle = Math.round((quadAngle*i)+quadCenterAngle);
            minAngle = Math.round(sectorAngle - this.getSectorThreshold());
            maxAngle = Math.round(sectorAngle + this.getSectorThreshold());
            if( (angle >= minAngle) && (angle <= maxAngle) ){
                if(sectorAngle === prevAngle){
                    return {isRotate:false};    
                }
                return {isRotate:true,value:i+1};
            }
        }
        return {isRotate:false};
    },
    
    //This check will make sure the knob will only rotate when the knob is in the range specified by arcAngle and arcOffset.
    isArcRotate: function(angle){
        if( (angle >= this.getArcOffset()) && (angle <= (this.getArcAngle() + this.getArcOffset())) ){
            return true;
        }
        return false;
    },
    
    /*This function switches the mode from continous, sectors and arc.
     * Expected mode values are 'continous','sector','arc'.
     * NOT WELL IMPLEMENTED. NEED TO FIND OUT TO HOW TO RECONFGIURE THE PLUGIN. BUT THIS WORKS.
     */
    changeKnobMode: function(mode){
        if(mode === 'continous'){
            this.setSectorCount(360);
            this.setArcAngle(null);
        } else if(mode === 'sector'){
            this.setArcAngle(null);
            this.setKnobValue(this.knobAngle);
            //Still need to manually set the sectorCount after the changeKnobMode function is executed.
        } else if(mode === 'arc'){
            this.setSectorCount(360);
            //Still need to manually set the arcAngle and arcOffset after the changeKnobMode function is executed.
        }
        return this;
    }
});