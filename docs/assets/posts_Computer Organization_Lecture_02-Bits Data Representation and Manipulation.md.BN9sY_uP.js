import{_ as s,c as a,a5 as i,j as t,a as n,o as l}from"./chunks/framework.CcAzSe5T.js";const V=JSON.parse('{"title":"Bits Data Representation and Manipulation","description":"","frontmatter":{"title":"Bits Data Representation and Manipulation","date":"2023-11-03T00:00:00.000Z","author":["AllenYGY"],"status":"DONE","tags":["NOTE","CO","Lec2"],"created":"2023-11-03T00:59","updated":"2024-05-31T00:50"},"headers":[],"relativePath":"posts/Computer Organization/Lecture/02-Bits Data Representation and Manipulation.md","filePath":"posts/Computer Organization/Lecture/02-Bits Data Representation and Manipulation.md","lastUpdated":null}'),o={name:"posts/Computer Organization/Lecture/02-Bits Data Representation and Manipulation.md"},r={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},Q={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.025ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.357ex",height:"1.025ex",role:"img",focusable:"false",viewBox:"0 -442 600 453","aria-hidden":"true"},d={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},m={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"0"},xmlns:"http://www.w3.org/2000/svg",width:"2.279ex",height:"1.528ex",role:"img",focusable:"false",viewBox:"0 -675.5 1007.3 675.5","aria-hidden":"true"},p={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},T={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.131ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 500 688","aria-hidden":"true"},h={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},u={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"0"},xmlns:"http://www.w3.org/2000/svg",width:"1.131ex",height:"1.507ex",role:"img",focusable:"false",viewBox:"0 -666 500 666","aria-hidden":"true"},g={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},c={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.186ex"},xmlns:"http://www.w3.org/2000/svg",width:"40.8ex",height:"2.158ex",role:"img",focusable:"false",viewBox:"0 -871.8 18033.7 953.8","aria-hidden":"true"};function x(b,e,f,w,H,k){return l(),a("div",null,[e[17]||(e[17]=i('<h1 id="bits-data-representation-and-manipulation" tabindex="-1">Bits Data Representation and Manipulation <a class="header-anchor" href="#bits-data-representation-and-manipulation" aria-label="Permalink to &quot;Bits Data Representation and Manipulation&quot;">​</a></h1><h2 id="binary-numbers-bits" tabindex="-1"><em>Binary Numbers: Bits</em> <a class="header-anchor" href="#binary-numbers-bits" aria-label="Permalink to &quot;*Binary Numbers: Bits*&quot;">​</a></h2><ul><li>1 BIT = Binary digITs; 1 bit: 0 or 1</li><li>1 Byte = 8 bits</li><li>A word is a fixed-sized piece of data handled as a unit</li></ul><h2 id="data-representation" tabindex="-1"><em>Data Representation</em> <a class="header-anchor" href="#data-representation" aria-label="Permalink to &quot;*Data Representation*&quot;">​</a></h2><ul><li>Numeric Data Representation <ul><li>Unsigned integers</li><li>Signed integers <ul><li>Sign-magnitude</li><li>1’s complement</li><li>2’s complement</li></ul></li><li>Real number representation</li><li>Floating-point numbers</li></ul></li><li>Non-numeric Data Representation</li></ul>',5)),t("p",null,[t("mjx-container",r,[(l(),a("svg",Q,e[0]||(e[0]=[t("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[t("g",{"data-mml-node":"math"},[t("g",{"data-mml-node":"mi"},[t("path",{"data-c":"1D45B",d:"M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z",style:{"stroke-width":"3"}})])])],-1)]))),e[1]||(e[1]=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mi",null,"n")])],-1))]),e[4]||(e[4]=n(" bits represent ")),t("mjx-container",d,[(l(),a("svg",m,e[2]||(e[2]=[i('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="msup"><g data-mml-node="mn"><path data-c="32" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z" style="stroke-width:3;"></path></g><g data-mml-node="TeXAtom" transform="translate(533,363) scale(0.707)" data-mjx-texclass="ORD"><g data-mml-node="mi"><path data-c="1D45B" d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" style="stroke-width:3;"></path></g></g></g></g></g>',1)]))),e[3]||(e[3]=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("msup",null,[t("mn",null,"2"),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"n")])])])],-1))]),e[5]||(e[5]=n(" things."))]),e[18]||(e[18]=i('<h2 id="numeric-data-representation" tabindex="-1">Numeric Data Representation <a class="header-anchor" href="#numeric-data-representation" aria-label="Permalink to &quot;Numeric Data Representation&quot;">​</a></h2><h3 id="unsigned-integers-representations" tabindex="-1"><em>Unsigned Integers Representations</em> <a class="header-anchor" href="#unsigned-integers-representations" aria-label="Permalink to &quot;*Unsigned Integers Representations*&quot;">​</a></h3><p><img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@master/IMAGE/CO-Binary-Decimal.png" alt="Binary-Decimal"></p><h3 id="signed-integer-representations" tabindex="-1"><em>Signed Integer Representations</em> <a class="header-anchor" href="#signed-integer-representations" aria-label="Permalink to &quot;*Signed Integer Representations*&quot;">​</a></h3>',4)),t("ul",null,[t("li",null,[e[12]||(e[12]=n("The left most bit (the most significant bit) is used as the sign bit. ")),e[13]||(e[13]=t("em",null,"最左位数表示正负",-1)),t("ul",null,[t("li",null,[t("mjx-container",p,[(l(),a("svg",T,e[6]||(e[6]=[t("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[t("g",{"data-mml-node":"math"},[t("g",{"data-mml-node":"mn"},[t("path",{"data-c":"30",d:"M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z",style:{"stroke-width":"3"}})])])],-1)]))),e[7]||(e[7]=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"0")])],-1))]),e[8]||(e[8]=n(" represents +"))]),t("li",null,[t("mjx-container",h,[(l(),a("svg",u,e[9]||(e[9]=[t("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[t("g",{"data-mml-node":"math"},[t("g",{"data-mml-node":"mn"},[t("path",{"data-c":"31",d:"M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z",style:{"stroke-width":"3"}})])])],-1)]))),e[10]||(e[10]=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"1")])],-1))]),e[11]||(e[11]=n(" represents -"))])])])]),e[19]||(e[19]=i('<h4 id="sign-magnitude" tabindex="-1"><em>Sign-magnitude</em> <a class="header-anchor" href="#sign-magnitude" aria-label="Permalink to &quot;*Sign-magnitude*&quot;">​</a></h4><ul><li>the remaining bits indicate the magnitude <em>剩余数字表示数字</em></li><li>Problem: there will be 2 zero: 0000/1000</li></ul><h4 id="_1-s-complement" tabindex="-1"><em>1’s complement</em> <a class="header-anchor" href="#_1-s-complement" aria-label="Permalink to &quot;*1’s complement*&quot;">​</a></h4><ul><li>the complement of its positive counterpart <em>除了第一位数剩余数字作反码操作</em></li></ul><h4 id="_2-s-complement" tabindex="-1"><em>2’s complement</em> <a class="header-anchor" href="#_2-s-complement" aria-label="Permalink to &quot;*2’s complement*&quot;">​</a></h4><ul><li>one greater than the 1’s complement of the positive value</li></ul><h3 id="property" tabindex="-1"><em>Property</em> <a class="header-anchor" href="#property" aria-label="Permalink to &quot;*Property*&quot;">​</a></h3><ol><li>For positive number： Signed-magnitude, 1&#39;s complement, 2&#39;s complement forms are the same.正数原码反码补码一样</li><li>After two backcode complements, the original number can be obtained 经过两次反码，补码操作可得到原数</li><li>For binary odd number, the most right bit must be one.</li><li>For Hexadecimal number each bit represents 4bits binary number</li></ol><h3 id="floating-point-numbers" tabindex="-1"><em>Floating-point numbers</em> <a class="header-anchor" href="#floating-point-numbers" aria-label="Permalink to &quot;*Floating-point numbers*&quot;">​</a></h3>',9)),t("ul",null,[t("li",null,[e[16]||(e[16]=n("Scientific notation: ")),t("mjx-container",g,[(l(),a("svg",c,e[14]||(e[14]=[i('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mn"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" style="stroke-width:3;"></path><path data-c="35" d="M164 157Q164 133 148 117T109 101H102Q148 22 224 22Q294 22 326 82Q345 115 345 210Q345 313 318 349Q292 382 260 382H254Q176 382 136 314Q132 307 129 306T114 304Q97 304 95 310Q93 314 93 485V614Q93 664 98 664Q100 666 102 666Q103 666 123 658T178 642T253 634Q324 634 389 662Q397 666 402 666Q410 666 410 648V635Q328 538 205 538Q174 538 149 544L139 546V374Q158 388 169 396T205 412T256 420Q337 420 393 355T449 201Q449 109 385 44T229 -22Q148 -22 99 32T50 154Q50 178 61 192T84 210T107 214Q132 214 148 197T164 157Z" transform="translate(500,0)" style="stroke-width:3;"></path><path data-c="30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" transform="translate(1000,0)" style="stroke-width:3;"></path><path data-c="30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" transform="translate(1500,0)" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(2277.8,0)"><path data-c="3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(3333.6,0)"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" style="stroke-width:3;"></path><path data-c="2E" d="M78 60Q78 84 95 102T138 120Q162 120 180 104T199 61Q199 36 182 18T139 0T96 17T78 60Z" transform="translate(500,0)" style="stroke-width:3;"></path><path data-c="35" d="M164 157Q164 133 148 117T109 101H102Q148 22 224 22Q294 22 326 82Q345 115 345 210Q345 313 318 349Q292 382 260 382H254Q176 382 136 314Q132 307 129 306T114 304Q97 304 95 310Q93 314 93 485V614Q93 664 98 664Q100 666 102 666Q103 666 123 658T178 642T253 634Q324 634 389 662Q397 666 402 666Q410 666 410 648V635Q328 538 205 538Q174 538 149 544L139 546V374Q158 388 169 396T205 412T256 420Q337 420 393 355T449 201Q449 109 385 44T229 -22Q148 -22 99 32T50 154Q50 178 61 192T84 210T107 214Q132 214 148 197T164 157Z" transform="translate(778,0)" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(4833.8,0)"><path data-c="D7" d="M630 29Q630 9 609 9Q604 9 587 25T493 118L389 222L284 117Q178 13 175 11Q171 9 168 9Q160 9 154 15T147 29Q147 36 161 51T255 146L359 250L255 354Q174 435 161 449T147 471Q147 480 153 485T168 490Q173 490 175 489Q178 487 284 383L389 278L493 382Q570 459 587 475T609 491Q630 491 630 471Q630 464 620 453T522 355L418 250L522 145Q606 61 618 48T630 29Z" style="stroke-width:3;"></path></g><g data-mml-node="msup" transform="translate(5834,0)"><g data-mml-node="mn"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" style="stroke-width:3;"></path><path data-c="30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" transform="translate(500,0)" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(1033,393.1) scale(0.707)"><path data-c="33" d="M127 463Q100 463 85 480T69 524Q69 579 117 622T233 665Q268 665 277 664Q351 652 390 611T430 522Q430 470 396 421T302 350L299 348Q299 347 308 345T337 336T375 315Q457 262 457 175Q457 96 395 37T238 -22Q158 -22 100 21T42 130Q42 158 60 175T105 193Q133 193 151 175T169 130Q169 119 166 110T159 94T148 82T136 74T126 70T118 67L114 66Q165 21 238 21Q293 21 321 74Q338 107 338 175V195Q338 290 274 322Q259 328 213 329L171 330L168 332Q166 335 166 348Q166 366 174 366Q202 366 232 371Q266 376 294 413T322 525V533Q322 590 287 612Q265 626 240 626Q208 626 181 615T143 592T132 580H135Q138 579 143 578T153 573T165 566T175 555T183 540T186 520Q186 498 172 481T127 463Z" style="stroke-width:3;"></path></g></g><g data-mml-node="mo" transform="translate(7548.3,0)"><path data-c="3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(8604.1,0)"><path data-c="30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" style="stroke-width:3;"></path><path data-c="2E" d="M78 60Q78 84 95 102T138 120Q162 120 180 104T199 61Q199 36 182 18T139 0T96 17T78 60Z" transform="translate(500,0)" style="stroke-width:3;"></path><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" transform="translate(778,0)" style="stroke-width:3;"></path><path data-c="35" d="M164 157Q164 133 148 117T109 101H102Q148 22 224 22Q294 22 326 82Q345 115 345 210Q345 313 318 349Q292 382 260 382H254Q176 382 136 314Q132 307 129 306T114 304Q97 304 95 310Q93 314 93 485V614Q93 664 98 664Q100 666 102 666Q103 666 123 658T178 642T253 634Q324 634 389 662Q397 666 402 666Q410 666 410 648V635Q328 538 205 538Q174 538 149 544L139 546V374Q158 388 169 396T205 412T256 420Q337 420 393 355T449 201Q449 109 385 44T229 -22Q148 -22 99 32T50 154Q50 178 61 192T84 210T107 214Q132 214 148 197T164 157Z" transform="translate(1278,0)" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(10604.3,0)"><path data-c="D7" d="M630 29Q630 9 609 9Q604 9 587 25T493 118L389 222L284 117Q178 13 175 11Q171 9 168 9Q160 9 154 15T147 29Q147 36 161 51T255 146L359 250L255 354Q174 435 161 449T147 471Q147 480 153 485T168 490Q173 490 175 489Q178 487 284 383L389 278L493 382Q570 459 587 475T609 491Q630 491 630 471Q630 464 620 453T522 355L418 250L522 145Q606 61 618 48T630 29Z" style="stroke-width:3;"></path></g><g data-mml-node="msup" transform="translate(11604.6,0)"><g data-mml-node="mn"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" style="stroke-width:3;"></path><path data-c="30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" transform="translate(500,0)" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(1033,393.1) scale(0.707)"><path data-c="34" d="M462 0Q444 3 333 3Q217 3 199 0H190V46H221Q241 46 248 46T265 48T279 53T286 61Q287 63 287 115V165H28V211L179 442Q332 674 334 675Q336 677 355 677H373L379 671V211H471V165H379V114Q379 73 379 66T385 54Q393 47 442 46H471V0H462ZM293 211V545L74 212L183 211H293Z" style="stroke-width:3;"></path></g></g><g data-mml-node="mo" transform="translate(13318.9,0)"><path data-c="3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(14374.7,0)"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" style="stroke-width:3;"></path><path data-c="35" d="M164 157Q164 133 148 117T109 101H102Q148 22 224 22Q294 22 326 82Q345 115 345 210Q345 313 318 349Q292 382 260 382H254Q176 382 136 314Q132 307 129 306T114 304Q97 304 95 310Q93 314 93 485V614Q93 664 98 664Q100 666 102 666Q103 666 123 658T178 642T253 634Q324 634 389 662Q397 666 402 666Q410 666 410 648V635Q328 538 205 538Q174 538 149 544L139 546V374Q158 388 169 396T205 412T256 420Q337 420 393 355T449 201Q449 109 385 44T229 -22Q148 -22 99 32T50 154Q50 178 61 192T84 210T107 214Q132 214 148 197T164 157Z" transform="translate(500,0)" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(15596.9,0)"><path data-c="D7" d="M630 29Q630 9 609 9Q604 9 587 25T493 118L389 222L284 117Q178 13 175 11Q171 9 168 9Q160 9 154 15T147 29Q147 36 161 51T255 146L359 250L255 354Q174 435 161 449T147 471Q147 480 153 485T168 490Q173 490 175 489Q178 487 284 383L389 278L493 382Q570 459 587 475T609 491Q630 491 630 471Q630 464 620 453T522 355L418 250L522 145Q606 61 618 48T630 29Z" style="stroke-width:3;"></path></g><g data-mml-node="msup" transform="translate(16597.1,0)"><g data-mml-node="mn"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" style="stroke-width:3;"></path><path data-c="30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" transform="translate(500,0)" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(1033,393.1) scale(0.707)"><path data-c="32" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z" style="stroke-width:3;"></path></g></g></g></g>',1)]))),e[15]||(e[15]=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"1500"),t("mo",null,"="),t("mn",null,"1.5"),t("mo",null,"×"),t("msup",null,[t("mn",null,"10"),t("mn",null,"3")]),t("mo",null,"="),t("mn",null,"0.15"),t("mo",null,"×"),t("msup",null,[t("mn",null,"10"),t("mn",null,"4")]),t("mo",null,"="),t("mn",null,"15"),t("mo",null,"×"),t("msup",null,[t("mn",null,"10"),t("mn",null,"2")])])],-1))])])]),e[20]||(e[20]=i('<h3 id="half-precision-floating-numbers" tabindex="-1"><em>Half Precision Floating Numbers</em> <a class="header-anchor" href="#half-precision-floating-numbers" aria-label="Permalink to &quot;*Half Precision Floating Numbers*&quot;">​</a></h3><p>Represented by 16 bits</p><ul><li>16 bits: 1 for sign; 5 for exponent; 10 for Mantissa</li><li>Exponent bias (offset): 24 -1 =15; range: [-14, 15] <ul><li>01111 represents 0 in exponent</li></ul></li></ul><p><img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@master/IMAGE/CO-HalfPrecisionFloating.png" alt="Half-Precision"><img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@master/IMAGE/CO-Half-Precision-Floating-example.png" alt="Half-Precision"></p><h3 id="single-point-precision-floating-numbers" tabindex="-1"><em>Single point Precision Floating Numbers</em> <a class="header-anchor" href="#single-point-precision-floating-numbers" aria-label="Permalink to &quot;*Single point Precision Floating Numbers*&quot;">​</a></h3><ul><li>32 bits: 1 for sign; 8 for exponent; 23 for Mantissa <img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@master/IMAGE/CO-Single-point-floating-number.png" alt="Single-point-floating-number"></li></ul><h2 id="non-numeric-data-representation" tabindex="-1"><em>Non-numeric Data Representation</em> <a class="header-anchor" href="#non-numeric-data-representation" aria-label="Permalink to &quot;*Non-numeric Data Representation*&quot;">​</a></h2><ul><li>Textual information</li><li>Audio information</li><li>Colors &amp; Images</li><li>Video information</li></ul><h3 id="ascii-code" tabindex="-1"><em>ASCII code</em> <a class="header-anchor" href="#ascii-code" aria-label="Permalink to &quot;*ASCII code*&quot;">​</a></h3><ul><li><p>The American Standard Code for Information Interchange</p></li><li><p>7 bits to represent 128 characters</p><ul><li>0~31: control characters</li><li>32~127: symbols, digits and letters</li></ul></li><li><p>48 represents &#39;0&#39;</p></li><li><p>65 represents &#39;A&#39;</p></li><li><p>97 represents &#39;a&#39; <img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@master/IMAGE/ASCII-Code.png" alt="ASCII-code"></p></li></ul><h3 id="universal-character-set" tabindex="-1"><em>Universal Character Set</em> <a class="header-anchor" href="#universal-character-set" aria-label="Permalink to &quot;*Universal Character Set*&quot;">​</a></h3><ul><li>16 bits</li><li>Support unlimited characters</li><li>To permit backward compatibility, ASCII is a subset of Unicode.</li></ul><h3 id="digital-audio" tabindex="-1"><em>Digital Audio</em> <a class="header-anchor" href="#digital-audio" aria-label="Permalink to &quot;*Digital Audio*&quot;">​</a></h3><ul><li>A microphone converts sound to an analog electrical signal</li><li>An analog-to-digital converter (ADC) converts the analog signal to a digital signal through sampling</li><li>CD audio, for example, has a sampling rate of 44.1 kHz (44,100 samples per second)</li><li>An digital-to-analog converter performs the reverse process, from a digital to an analog signal</li><li>An analog signal can be amplified and send to a speaker to produce sound</li></ul><h3 id="image-video" tabindex="-1"><em>Image &amp; Video</em> <a class="header-anchor" href="#image-video" aria-label="Permalink to &quot;*Image &amp; Video*&quot;">​</a></h3><ul><li>A video consists of a stream of frames, or images, displayed at n&gt;16 frames per second</li><li>An Image consist of a collection of pixels</li><li>Pixels are tiny dots of color</li><li>A pixel’s color is represented by a binary number, its RGB value</li><li>Thus a video can be seen as a huge binary number</li></ul><h2 id="operations-on-bits" tabindex="-1">Operations on Bits <a class="header-anchor" href="#operations-on-bits" aria-label="Permalink to &quot;Operations on Bits&quot;">​</a></h2><ul><li>Binary Arithmetic Operations <ul><li>Addition and subtraction</li><li>Sign Extension</li><li>Overflow</li></ul></li><li>Boolean Logic Operations <ul><li>AND</li><li>OR</li><li>NOT</li><li>XOR</li></ul></li></ul>',18))])}const y=s(o,[["render",x]]);export{V as __pageData,y as default};