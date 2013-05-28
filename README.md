Sencha Touch Knob
===================

This is a plugin that can be added to an image class of sencha touch 2 and above. This provides various functionality of a rotating knob. There are currently 3 modes the knob will work.

Go to the [__demo page__](http://blessenm.github.io/SenchaTouchKnob/demo.html "Sencha Touch Knob") to see it in action.

 1. Continous

    Here the knob will rotate a whole 360 degree angle.

 2. Sectors

    Here the 360 degree will be divided into a number of sectors.
    So the knob will only snap to middle of the sector.

 3. Arc

    We can specify and arc range in degree's and an offset angle.
    In this mode, the knob will only rotate in the specified arc range.

## Documentation##

###Config###
 + __knobValue__  

   {Number} knobValue The value set for the knob.  
   When the sectorCount is 360, knobValue can be between 0 and 360.  
   When sectorCount is less than 360, the knob value must be between 1 and the sectorCount.
 + __sectorCount__

   {Number} sectorCount Number of sectors the circle should be divided into.  
   The default is 360.  
   The value must be 0 > x <= 360.
 + __sectorThreshold__

   {Number} sectorThreshold This specifies a range in which the knob should snap to the nearest sector point.  
   The default is 10.  
   So if 45 is a sector point, the knob will snap when it reaches an angle between 35 and 55.  
 + __arcAngle__

   {Number} arcAngle The arc range in degree in which the knob will rotate.  
   The value must be 0 > x < 360.  
 + __arcOffset__

   {Number} arcOffset This spectifies the offset in whoch the arc should begin.  
   Default value is 0.  
   The value must be 0 > x < 360.

###Events
1. __turn__

   This event will fire for the image the plugin is attached to.
   
   Parameters
   
      * angle

        Angle at which the knob is rotated to.  
        0 starts from the top and move's in clockwise direction.
     
      * value

        Value of the knob.  
        For continous mode, the value will be the same as the angle.  
        For sectors mode, the value will be the sector number at which the knob is currently at.  
        For arc, mode, the value will be between 0, and the arcAngle.

 

###Usage
   For continous mode

   

    {
        xtype:'img',
        src:'images/arrow.png',
        width:128,
        height:128,
        centered:true,
        plugins:[
            {
                xclass:'Ext.plugin.Knob'
            }
        ],
        listeners:{
            turn:function(angle,value){
            }
        }
    }  

For sectors mode,

   

    {
        xtype:'img',
        src:'images/arrow.png',
        width:128,
        height:128,
        centered:true,
        plugins:[
            {
                xclass:'Ext.plugin.Knob',
                sectorCount:12
            }
        ],
        listeners:{
            turn:function(angle,value){
            }
        }
    }

For arc mode,

   

    {
        xtype:'img',
        src:'images/arrow.png',
        width:128,
        height:128,
        centered:true,
        plugins:[
            {
                xclass:'Ext.plugin.Knob',
                arcAngle:270,
                arcOffset:45
            }
        ],
        listeners:{
            turn:function(angle,value){
            }
        }
    }

Version
- 
1.0

* Developed for Sencha Touch 2.0.0

1.1

* Upgraded the plugin to support Sencha Touch 2.2.1
* This upgraded wil not support backward compatibility with the previous versions of Sencha Touch.

Issues Or Contributions
-

* Post issues in the github issue tracker.
*  My email is blessenm@gmail.com
*  Pull requests are welcome.
*  [__LinkedIn Pofile__](http://in.linkedin.com/pub/blessan-mathew/24/605/730 "LinkedIn Profie")
*  [__Stack Overflow Pofile__](http://stackoverflow.com/users/548568/blessenm "Stack Overflow Pofile") 