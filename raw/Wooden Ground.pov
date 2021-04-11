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
     	
pigment{ square 

           color rgb<1.39, 0.69, 0.19>
           color rgb<1.39, 0.69, 0.19>
           color rgb<1.39, 0.90, 0.43>
           color rgb<1.39, 0.90, 0.43>
          
         } 
                         
        }
            
     } 
     
     