// Reference: https://www.color-hex.com/color-palette/4958
// Reference2: http://www.f-lohmueller.de/pov_tut/tex/tex_750e.htm

#include "colors.inc"

       

background {color rgb <0, 0, 0>}
 
 
 
camera {
  location <0, 0, 0>
  look_at  <1, 0,  0>
}                    

 light_source { <0, 0, 0>
                color White*0.5
}
 
 
box { <-3, -3, -3>,
      <3, 3, 3>
      texture{
     pigment{ brick
              color Black
              //color rgb<0.21,0.73,1.78>     
              //color rgb<0.25,0.84,2.02>  
              color rgb<0.13,0.53,1.34>
              brick_size <0.6, 1, 0.15 >
              mortar 0.01 
            }
     normal { wrinkles 1 scale 0.4}        

     } // end of texture
            
     } 
     
     