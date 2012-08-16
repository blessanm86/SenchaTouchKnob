/**
 * This example demonstrates the Knob plugin in Sencha Touch 2.
 */

Ext.Loader.setPath({
    'Ext.plugin':'js/plugin'
});

Ext.application({
    
    requires: [
        'Ext.Img',
        'Ext.plugin.Knob'
    ],

    launch: function() {
        Ext.Viewport.add(
            {
                xtype:'navigationview',
                fullscreen:true,
                activeItem:0,
                items:[
                    {
                        title:'Blessan Mathew',
                        layout:{
                            type:'vbox',
                            pack:'middle',
                            align:'middle'
                        },
                        defaults:{
                            width:200,
                            xtype:'button',
                            margin:'10 0 10 0'
                        },
                        items:[
                            {
                                text:'Ext.plugin.Knob',
                                listeners:{
                                    tap:function(button, event, options){
                                        this.goToNextPage(button,0);    
                                    },
                                    scope:this
                                }
                            },
                            {
                                text:'Ext.ux.Knob',
                                listeners:{
                                    tap:function(button, event, options){
                                        this.goToNextPage(button,1);    
                                    },
                                    scope:this
                                }
                            }
                        ]
                    }
                ]
            }
        );
    },
    goToNextPage: function(btn,index){        
        var knobPlugin = {
            colors:['#741D54','#3D1C55','#2D245C','#05547D','#046C65','#046424','#5C7613','#9C931C','#955C15','#8B3C15','#8B2415','#8D2435'],
            title:btn.getText(),
            layout:'vbox',
            //scrollable:true,
            defaults:{
                flex:1    
            },
            items:[
                {
                    layout:'hbox',
                    defaults:{
                        flex:1    
                    },
                    margin:10,
                    items:[
                        {  
                            items:[
                                {
                                    xtype:'segmentedbutton',
                                    allowDepress:true,
                                    items:[
                                        {
                                            text:'Continous',
                                            pressed:true
                                        },
                                        {
                                            text:'Sectors'
                                        },
                                        {
                                            text:'Arcs'
                                        }
                                    ],
                                    listeners: {
                                        toggle: function(container, button, pressed){
                                            if((button.getText() === 'Continous') && (pressed === true)){
                                                btn.up('[xtype="navigationview"]').down('[xtype="img"]').getPlugins()[0].changeKnobMode('continous');
                                                btn.up('[xtype="navigationview"]').down('[xtype="img"]').getPlugins()[0].setKnobValue(0);
                                            } else if((button.getText() === 'Sectors') && (pressed === true)){
                                                btn.up('[xtype="navigationview"]').down('[xtype="img"]').getPlugins()[0].changeKnobMode('sector');
                                                btn.up('[xtype="navigationview"]').down('[xtype="img"]').getPlugins()[0].setSectorCount(12);
                                                btn.up('[xtype="navigationview"]').down('[xtype="img"]').getPlugins()[0].setKnobValue(1);
                                            } else if((button.getText() === 'Arcs') && (pressed === true)){
                                                btn.up('[xtype="navigationview"]').down('[xtype="img"]').getPlugins()[0].changeKnobMode('arc');
                                                btn.up('[xtype="navigationview"]').down('[xtype="img"]').getPlugins()[0].setArcAngle(270);
                                                btn.up('[xtype="navigationview"]').down('[xtype="img"]').getPlugins()[0].setArcOffset(45);
                                                btn.up('[xtype="navigationview"]').down('[xtype="img"]').getPlugins()[0].setKnobValue(0);
                                            }
                                        }
                                    }
                                },
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
                                            btn.up('[xtype="navigationview"]').down('[placeHolder="Knob Angle"]').setValue(angle);
                                            btn.up('[xtype="navigationview"]').down('[placeHolder="Knob Value"]').setValue(value);
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            layout:{
                                type:'hbox',
                                align:'center'
                            },
                            items:[
                                {
                                    xtype:'textfield',
                                    placeHolder:'Knob Angle',
                                    height:'2.5em'
                                },
                                {
                                    xtype:'spacer'
                                },
                                {
                                    xtype:'textfield',
                                    placeHolder:'Knob Value',
                                    height:'2.5em'
                                }
                            ]                            
                        }
                    ]
                },
                {
                    layout:'hbox',
                    defaults:{
                        flex:1    
                    },
                    items:[                        
                        {
                            style:'background:url("images/color-wheel.png") no-repeat 50%',
                            items:[
                                {
                                    xtype:'img',
                                    src:'images/arrow.png',
                                    width:128,
                                    height:128,
                                    centered:true,
                                    plugins:[
                                        {
                                            xclass:'Ext.plugin.Knob',
                                            sectorCount:12,
                                            knobValue:3
                                        }
                                    ],
                                    listeners:{
                                        turn:function(angle,value){
                                            console.info("'background-color:"+knobPlugin.colors[value]+"'");
                                            btn.up('[xtype="navigationview"]').down('[html="&nbsp;"]').setStyle("background-color:"+knobPlugin.colors[value]);
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            html:'&nbsp;',
                        }
                    ]
                }
            ]
        };
        
        var knobExtension = {
            title:btn.getText()
        };
        
        if(index === 0){
            btn.up('[xtype="navigationview"]').push(knobPlugin);    
        } else {
            btn.up('[xtype="navigationview"]').push(knobExtension);
        }        
    }
});