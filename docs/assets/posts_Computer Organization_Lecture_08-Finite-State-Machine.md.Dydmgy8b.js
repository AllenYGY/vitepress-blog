import{_ as t,c as i,a5 as a,o as n}from"./chunks/framework.CcAzSe5T.js";const f=JSON.parse('{"title":"Finite-State-Machine","description":"","frontmatter":{"title":"Finite-State-Machine","date":"2023-11-03T00:00:00.000Z","author":["AllenYGY"],"status":"DONE","tags":["NOTE","CO","Lec7"],"created":"2023-11-03T00:59","updated":"2024-05-31T00:32"},"headers":[],"relativePath":"posts/Computer Organization/Lecture/08-Finite-State-Machine.md","filePath":"posts/Computer Organization/Lecture/08-Finite-State-Machine.md","lastUpdated":null}'),o={name:"posts/Computer Organization/Lecture/08-Finite-State-Machine.md"};function l(s,e,r,h,c,m){return n(),i("div",null,e[0]||(e[0]=[a('<h1 id="finite-state-machine" tabindex="-1">Finite-State-Machine <a class="header-anchor" href="#finite-state-machine" aria-label="Permalink to &quot;Finite-State-Machine&quot;">​</a></h1><h2 id="the-concept-of-state" tabindex="-1"><em>The Concept of State</em> <a class="header-anchor" href="#the-concept-of-state" aria-label="Permalink to &quot;*The Concept of State*&quot;">​</a></h2><ul><li>The output of a sequential circuit is a function of the current input and the previous state <em>时序电路的输出是当前输入和先前状态的函数</em></li><li>The state is stored in the storage element <em>状态存储在存储元件中</em></li><li>The new state is also a function of the previous state and the current input <em>新状态也是前一个状态和当前输入的函数</em></li></ul><img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@main/uPic/20KSlQ.jpg" alt="20KSlQ"><h2 id="finite-state-machine-有限状态机" tabindex="-1"><em>Finite-State Machine</em> 有限状态机 <a class="header-anchor" href="#finite-state-machine-有限状态机" aria-label="Permalink to &quot;*Finite-State Machine* 有限状态机&quot;">​</a></h2><ul><li>A system is a finite state machine if it has the following five properties: <ul><li>A finite number of states <em>有限状态</em></li><li>A finite number of external inputs <em>有限外部输入</em></li><li>A finite number of external outputs <em>有限外部输出</em></li><li>An explicit specification of all allowed state transitions <em>所有合法状态转换的明确规范</em></li><li>An explicit specification of the rules for each external output value <em>每个外部输出值的规则的明确规范</em></li></ul></li></ul><h3 id="state-diagram" tabindex="-1"><em>State Diagram</em> <a class="header-anchor" href="#state-diagram" aria-label="Permalink to &quot;*State Diagram*&quot;">​</a></h3><ul><li>Each state is shown with a circle, labeled with the state value – the contents of the circle are the outputs</li><li>An arc represents a transition to a different state, with the inputs indicated on the label 每个状态都用一个圆圈显示，并标有状态值 - 圆圈的内容是输出 圆弧表示向不同状态的过渡，输入在标签上指示</li></ul><img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@main/uPic/kOuuts.jpg" alt="kOuuts"><ul><li><em>3-bit counter</em></li></ul><img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@main/uPic/1sA1to.jpg" alt="1sA1to"><ul><li><p><em>A Danger Sign</em></p></li><li><p>当开关断开 If the switch is turned off, all the lights are turned off and remain off</p></li><li><p>当开关闭合 When the switch is in the ON position, the controller directs the lights as follows: During one unit of time, all lights will be off. In the next unit of time, lights 1 and 2 will be on. The next unit of time, lights 1, 2, 3, and 4 will be on. Then all five lights will be on. Then the sequence repeats: no lights on, followed by 1 and 2 on, followed by 1, 2, 3, and 4 on, and so forth. <img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@main/uPic/WQStkW.png" alt="WQStkW" width="40%"> <img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@main/uPic/LfonWY.png" alt="LfonWY"></p></li></ul><p>当All-on到All-off 输入0或1都可以实现而不是同时输入</p><img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@main/uPic/5Nd4hq.png" alt="5Nd4hq"><img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@main/uPic/Lrhv6a.png" alt="Lrhv6a"><ul><li>First, the two external inputs: the switch and the clock. The switch determines whether the finite state machine will transition through the four states or whether it will transition to state A, where all lights are off. The other input (the clock) controls the transition from state A to B, B to C, C to D, and D to A by controlling the state of the storage elements. We will see how, momentarily.</li><li>Second, there are two storage elements for storing state information. Since there are four states, and since each storage element can store one bit of information, the four states are identified by the contents of the two storage elements: A (00), B (01), C (10), and D (11). Storage element 2 contains the high bit; storage element 1 contains the low bit. For example, the danger sign controller is in state B when storage element 2 is 0 and storage element 1 is 1.</li><li>Third, combinational logic circuit 1 shows that the on/off behavior of the lights is controlled by the storage elements. That is, the input to the combinational logic circuit is from the two storage elements, that is, the current state of the finite state machine.</li><li>Finally, combinational logic circuit 2 shows that the transition from the current state to the next state depends on the two storage elements and the switch. If the switch is on, the output of combinational logic circuit 2 depends on the state of the two storage elements.</li></ul><h3 id="turing-machine-vs-fsm" tabindex="-1"><em>Turing Machine vs FSM</em> <a class="header-anchor" href="#turing-machine-vs-fsm" aria-label="Permalink to &quot;*Turing Machine vs FSM*&quot;">​</a></h3><ul><li>A Turing machine is a finite state machine plus a tape memory.</li><li>Each transition may be accompanied by an operation on the tape (move, read, write).</li><li>Its total possible configurations are arbitrarily large, regardless of the size of the program; it expands towards infinity.</li><li>Turing machines have more computational power than FSM.</li></ul>',18)]))}const d=t(o,[["render",l]]);export{f as __pageData,d as default};