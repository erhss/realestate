// Reference: https://www.color-hex.com/color-palette/4958
// Reference2: http://www.f-lohmueller.de/pov_tut/tex/tex_750e.htm

#include "colors.inc"

       

background {color rgb <0, 0, 0>}
 
 
 
camera {
  location <0, 0, 0>
  look_at  <0, 1,  0>
}                    

 light_source { <0, 0, 0>
                color White*0.5
}
 
 
box { <-3, -3, -3>,
      <3, 3, 3>
      texture{
     	
pigment{
         pavement
           number_of_sides 4 
           number_of_tiles 1 
           pattern 1 
             exterior 0 
           color_map{ [ 0.00 color rgb<1,1,1>*6]
                      [ 1.00 color rgb<1,1,1>*0]
                    } 
           scale 0.5
        } 
            
     } 
                       }
     