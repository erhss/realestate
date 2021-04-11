// Reference: https://www.color-hex.com/color-palette/4958
// Reference2: http://www.f-lohmueller.de/pov_tut/tex/tex_750e.htm

#include "colors.inc"

       

background {color rgb <0, 0, 0>}
 
 
 
camera {
  location <0, 0, 0>
  look_at  <0, 1,  0>
}                    

 light_source { <0, 0, 0>
                color White*0.25
}
 
 
box { <-3, -3, -3>,
      <3, 3, 3>
      texture{ pigment{color rgb <0.4,1.53,0.51>}
               normal {bumps 1 scale 0.025}
               finish {diffuse 0.9 phong 3}
             } // end of texture
             }
            
