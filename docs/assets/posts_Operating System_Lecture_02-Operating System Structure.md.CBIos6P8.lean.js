import{_ as s,c as i,a5 as t,j as a,a as l,o as r}from"./chunks/framework.CcAzSe5T.js";const f=JSON.parse('{"title":"02-Operating System Structure","description":"","frontmatter":{"date":"2024-03-08T00:00:00.000Z","title":"02-Operating System Structure","status":"DONE","tags":["OS","NOTE","Lec2"],"archived":true,"author":["AllenYGY"],"created":"2024-03-20T17:14","updated":"2024-03-21T21:01"},"headers":[],"relativePath":"posts/Operating System/Lecture/02-Operating System Structure.md","filePath":"posts/Operating System/Lecture/02-Operating System Structure.md","lastUpdated":null}'),o={name:"posts/Operating System/Lecture/02-Operating System Structure.md"},n={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},c={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.09ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.76ex",height:"1.312ex",role:"img",focusable:"false",viewBox:"0 -540 778 580","aria-hidden":"true"};function d(u,e,m,p,h,g){return r(),i("div",null,[e[4]||(e[4]=t('<h1 id="operating-system-structure" tabindex="-1">Operating System Structure <a class="header-anchor" href="#operating-system-structure" aria-label="Permalink to &quot;Operating System Structure&quot;">​</a></h1><h2 id="operating-system-services" tabindex="-1"><strong>Operating System Services</strong> <a class="header-anchor" href="#operating-system-services" aria-label="Permalink to &quot;**Operating System Services**&quot;">​</a></h2><p><img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@master/IMAGE/OS/OS-Services.png" alt="OS-Service"></p><ul><li>Two categories of services <ul><li>Services to the user: <ul><li><code>UI</code>,<code>File tree</code>,....</li></ul></li><li>Services for the efficient operations <ul><li>Management of memory</li><li>CPU scheduling</li><li>...</li></ul></li></ul></li></ul><h3 id="services-to-the-user" tabindex="-1"><strong>Services to the User</strong> <a class="header-anchor" href="#services-to-the-user" aria-label="Permalink to &quot;**Services to the User**&quot;">​</a></h3><ul><li><strong>User Interface</strong> <code>UI</code><ul><li>Command-Line Interface <code>CLI</code></li><li>Graphics User Interface <code>GUI</code></li><li>Touch-screen</li><li>Batch processing <code>批处理</code></li></ul></li><li><strong>Program Execution</strong><ul><li>Load a program into memory</li><li>Run a program, and then end execution</li></ul></li><li><strong>I/O Operations</strong></li><li><strong>File-System Manipulation</strong><ul><li>Read-Write</li></ul></li><li><strong>Communications</strong><ul><li>Process exchange information</li></ul></li><li><strong>Error detection</strong><ul><li>Handle possible errors</li></ul></li></ul><h3 id="services-to-the-efficient-operations" tabindex="-1"><strong>Services to the efficient operations</strong> <a class="header-anchor" href="#services-to-the-efficient-operations" aria-label="Permalink to &quot;**Services to the efficient operations**&quot;">​</a></h3><ul><li><strong>Resource allocation</strong></li><li>When multiple users or multiple jobs are using computer concurrently, resources must be allocated to each of them <ul><li>Many types of resources <ul><li>CPU, main memory, file storage, I/O devices.</li></ul></li></ul></li><li><strong>Logging</strong><ul><li>keep track of which programs use how much and what kinds of computer resources</li></ul></li><li>**Protection and Security ** <ul><li>Protection <ul><li>Ensure that all access to system resources is controlled</li></ul></li><li>Security <ul><li>Avoid attack from outside the system</li></ul></li></ul></li></ul><h2 id="user-and-operating-system-interface" tabindex="-1"><strong>User and Operating System Interface</strong> <a class="header-anchor" href="#user-and-operating-system-interface" aria-label="Permalink to &quot;**User and Operating System Interface**&quot;">​</a></h2><h3 id="command-line-interface-cli" tabindex="-1"><strong>Command Line Interface</strong> <code>CLI</code> <a class="header-anchor" href="#command-line-interface-cli" aria-label="Permalink to &quot;**Command Line Interface** `CLI`&quot;">​</a></h3><p><code>CLI</code> or <code>command interpreter</code> allows direct command entry.</p><ul><li>Commands are sometimes implemented in kernel <ul><li>commands built-in <code>内建指令</code></li></ul></li><li>Commands are sometimes by systems program <ul><li>names of programs <code>程序名</code></li><li>Advantage: adding new features doesn’t require modification of interpreter</li></ul></li></ul><h3 id="graphical-user-interface-gui" tabindex="-1"><strong>Graphical User Interface</strong> <code>GUI</code> <a class="header-anchor" href="#graphical-user-interface-gui" aria-label="Permalink to &quot;**Graphical User Interface**  `GUI`&quot;">​</a></h3><ul><li>User-friendly <ul><li>desktop metaphor (象征) interface</li><li>Icons represent files, programs, actions, etc.</li></ul></li><li>Invented at Xerox PARC (1970s)</li><li>Many systems now include both CLI and GUI interfaces <ul><li>Microsoft Windows is GUI with CLI “cmd” shell</li><li>Apple Mac OS X is “Aqua” GUI interface with UNIX kernel underneath and shells available</li><li>Unix and Linux have CLI with optional GUI interfaces</li></ul></li></ul><h2 id="system-calls-api-c-libraries" tabindex="-1"><strong>System Calls, API, C Libraries</strong> <a class="header-anchor" href="#system-calls-api-c-libraries" aria-label="Permalink to &quot;**System Calls,  API, C Libraries**&quot;">​</a></h2><h3 id="system-calls" tabindex="-1"><strong>System Calls</strong> <a class="header-anchor" href="#system-calls" aria-label="Permalink to &quot;**System Calls**&quot;">​</a></h3><p>System calls provide an programming interface for programs to use services of operating systems.</p><h3 id="api" tabindex="-1"><strong>API</strong> <a class="header-anchor" href="#api" aria-label="Permalink to &quot;**API**&quot;">​</a></h3><ul><li>Typically, application developers design programs according to an API rather than directly system calls.</li><li>The API <code>Application Programming Interface</code> specifies a set of functions that are available to an application programmer. <ul><li><strong>Common API</strong><ul><li>Win32 API for Windows</li><li>POSIX API for POSIX-based systems (including virtually all versions of UNIX, Linux, and Mac OS X)</li><li>POSIX <code>Portable Operating System Interface</code> is – a family of standards specified by the IEEE Computer Society for maintaining compatibility between operating systems.</li><li>Java API for the Java virtual machine (JVM)</li></ul></li></ul></li></ul><h4 id="system-calls-and-api" tabindex="-1"><strong>System Calls and API</strong> <a class="header-anchor" href="#system-calls-and-api" aria-label="Permalink to &quot;**System Calls and API**&quot;">​</a></h4><ul><li><p>The caller just needs to <code>obey API</code> know <strong>nothing</strong> about how the system call is implemented Most details of OS interface hidden from programmer by API</p></li><li><p>The system call interface invokes the intended system call in OS kernel and returns status of the system call and any return values</p></li><li><p>Each system call has a number (as index)</p></li><li><p>System-call interface maintains a table: indexed according to these numbers</p></li></ul><h4 id="system-call-parameter-passing" tabindex="-1"><strong>System Call Parameter Passing</strong> <a class="header-anchor" href="#system-call-parameter-passing" aria-label="Permalink to &quot;**System Call Parameter Passing**&quot;">​</a></h4><ul><li>Three general methods <ul><li><strong>Simplest/Fastest</strong>: pass the parameters in <em>registers</em><ul><li>缺点：寄存器不够大，限制传参数量</li></ul></li><li>Parameters <em>stored in a block/table, in memory</em>, and address of block passed as a parameter in a register.</li><li>Parameters are pushed onto the stack by the program and off the stack by the operating system</li></ul></li></ul><h4 id="type-of-system-call" tabindex="-1"><strong>Type of System Call</strong> <a class="header-anchor" href="#type-of-system-call" aria-label="Permalink to &quot;**Type of System Call**&quot;">​</a></h4><ul><li>Process Control</li><li>File Management</li><li>Device Management</li><li>Information maintenance</li><li>Communications</li><li>Protection</li></ul><p><img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@master/IMAGE/OS/SystemCalls.png" alt="System Calls"></p><h3 id="standard-c-library-vs-system-call" tabindex="-1"><strong>Standard C Library vs System Call</strong> <a class="header-anchor" href="#standard-c-library-vs-system-call" aria-label="Permalink to &quot;**Standard C Library vs System Call**&quot;">​</a></h3><ul><li><p><code>Standard C Library</code></p><ul><li>Contains functions which make system calls or do not make system calls makes programmers’ work much easier</li></ul></li><li><p><code>Advantages of using Standard C Library</code></p><ul><li>It is <strong>simpler</strong> to call a function in a standard C library rather than to make a system call</li><li><strong>Portability</strong><ul><li>Source code executed in one OS can be run in another OS</li></ul></li></ul></li><li><p><code>Advantages of using system Calls</code></p><ul><li>System calls are usually more powerful than functions from the Standard C Library <ul><li>Can create processes, share memory between processes, etc. These advanced features are not available in the Standard C Library.</li></ul></li><li>It’s a little bit <strong>faster</strong> than using a library function (since internally the library function uses a system call anyway).</li></ul></li></ul><h3 id="standard-c-library-vs-c-posix-library" tabindex="-1"><strong>Standard C Library vs C POSIX Library</strong> <a class="header-anchor" href="#standard-c-library-vs-c-posix-library" aria-label="Permalink to &quot;**Standard C Library vs C POSIX Library**&quot;">​</a></h3>',29)),a("p",null,[a("strong",null,[e[2]||(e[2]=l("Subset ")),a("mjx-container",n,[(r(),i("svg",c,e[0]||(e[0]=[a("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[a("g",{"data-mml-node":"math"},[a("g",{"data-mml-node":"mo"},[a("path",{"data-c":"2282",d:"M84 250Q84 372 166 450T360 539Q361 539 370 539T395 539T430 540T475 540T524 540H679Q694 532 694 520Q694 511 681 501L522 500H470H441Q366 500 338 496T266 472Q244 461 224 446T179 404T139 337T124 250V245Q124 157 185 89Q244 25 328 7Q348 2 366 2T522 0H681Q694 -10 694 -20Q694 -32 679 -40H526Q510 -40 480 -40T434 -41Q350 -41 289 -25T172 45Q84 127 84 250Z",style:{"stroke-width":"3"}})])])],-1)]))),e[1]||(e[1]=a("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("mo",null,"⊂")])],-1))]),e[3]||(e[3]=l(" Superset"))])]),e[5]||(e[5]=t('<p>The C POSIX library was developed at the same time as the ANSI C standard. includes additional functions to those introduced in standard C</p><h2 id="system-programs" tabindex="-1"><strong>System Programs</strong> <a class="header-anchor" href="#system-programs" aria-label="Permalink to &quot;**System Programs**&quot;">​</a></h2><p>System programs provide a convenient environment for program development and execution. They can be divided into:</p><ul><li>File manipulation</li><li>Status information sometimes stored in a file</li><li>Programming language support</li><li>Program loading and execution</li><li>Communications</li><li>Background services (e.g., launch OS, disk checking, daemons(守护进程))</li><li>Application programs</li></ul><p>Most User&#39;s view of the operation system is</p><ul><li>defined by system programs, not the actual system calls (for system or application programmers)</li></ul><h3 id="why-applications-are-operating-system-specific" tabindex="-1"><strong>Why Applications are Operating System Specific</strong> <a class="header-anchor" href="#why-applications-are-operating-system-specific" aria-label="Permalink to &quot;**Why Applications are Operating System Specific**&quot;">​</a></h3><ul><li><p>Apps compiled on one system usually are not executable on other operating systems</p><ul><li>Each operating system provides its own unique system calls</li></ul></li><li><p>How can apps be used in multi-operating systems</p><ul><li>Written in an interpreted language like Python, Ruby, and interpreter available on multiple operating systems<code>解释性语言</code></li><li>Written in a language that includes a VM containing the running app (like Java) <code>包括虚拟机的语言</code></li><li>Written in a standard language (like C), compiled separately on each operating system to run on each OS <code>标准语言</code></li></ul></li><li><p>Application Binary Interface (ABI) is</p><ul><li>about how different components of binary code can interface for a given operating system on a given architecture</li><li>in low-level details <code>定义了不同的二进制代码组件如何在特定操作系统和特定础础架构上进行交互的低级别细节。</code></li></ul></li></ul><h2 id="operating-system-implementation-history" tabindex="-1"><strong>Operating System Implementation History</strong> <a class="header-anchor" href="#operating-system-implementation-history" aria-label="Permalink to &quot;**Operating System Implementation History**&quot;">​</a></h2><ul><li>Early <code>OSes</code> in assembly language</li><li>Then system programming languages like Algol, PL/1</li><li>Now high level language C, C++ <ul><li>High-level language is easier to port to other hardware</li><li>But slower</li></ul></li></ul><p>Actually usually a mix of languages</p><ul><li>Lowest levels in assembly language</li><li>Main body in C</li><li>Systems programs in C, C++, scripting languages like PERL, Python, shell scripts</li><li>Emulation can allow an OS to run on non-native hardware</li></ul><h2 id="operating-system-structures" tabindex="-1"><strong>Operating System Structures</strong> <a class="header-anchor" href="#operating-system-structures" aria-label="Permalink to &quot;**Operating System Structures**&quot;">​</a></h2><ul><li>Various ways to structure ones <ul><li>Simple structure – MS-DOS</li><li>More complex -- UNIX</li><li>Layered</li><li>Microkernel -Mach</li></ul></li></ul><h3 id="monolithic–-traditional-unix" tabindex="-1"><strong>Monolithic– Traditional UNIX</strong> <a class="header-anchor" href="#monolithic–-traditional-unix" aria-label="Permalink to &quot;**Monolithic– Traditional UNIX**&quot;">​</a></h3><ul><li>limited structuring (due to early hardware) <code>有限结构化</code></li><li>The UNIX OS consists of two separable parts <ul><li>Systems programs</li><li>The kernel <ul><li>Consists of everything below the system-call interface and above the physical hardware</li><li>Provides the file system, CPU scheduling, memory management, and other operating-system functions;</li><li>Consists of a large number of functions in one level</li></ul></li></ul></li></ul><h3 id="monolithic-plus-modular-linux-system-structure" tabindex="-1"><strong>Monolithic Plus Modular - Linux System Structure</strong> <a class="header-anchor" href="#monolithic-plus-modular-linux-system-structure" aria-label="Permalink to &quot;**Monolithic Plus Modular - Linux System Structure**&quot;">​</a></h3><ul><li>Advantages for monolithic design <ul><li>High speed</li><li>High efficiency</li></ul></li><li>Advantages for modular design <ul><li>changes in one component affect only that component, and no others</li><li>Modules can be modified easily.</li></ul></li></ul><h3 id="layered-approach" tabindex="-1"><strong>Layered Approach</strong> <a class="header-anchor" href="#layered-approach" aria-label="Permalink to &quot;**Layered Approach**&quot;">​</a></h3><ul><li>The operating system is divided into a number of layers (levels) <ul><li>The bottom layer (layer 0), is the hardware.</li><li>The highest (layer N) is the user interface.</li><li>Each layer is built on top of lower layers <ul><li>With modularity, each layer uses functions (operations) and services of only lower-level layers</li></ul></li></ul></li><li>Advantage: Simplicity of construction and debugging.</li><li>Disadvantages: <ul><li>Hard to define each layer.</li><li>Poor performance. %% <img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@master/IMAGE/OS/LayeredApproach.png" alt=""><img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@master/IMAGE/OS/Layer.png" alt=""> %%</li></ul></li></ul><h3 id="microkernels-微内核" tabindex="-1"><strong>Microkernels</strong> <code>微内核</code> <a class="header-anchor" href="#microkernels-微内核" aria-label="Permalink to &quot;**Microkernels** `微内核`&quot;">​</a></h3><p>Moves as much components from the kernel into user space</p><ul><li>Mach Mac OS X kernel (Darwin) partly based on Mach</li></ul><p>Communication takes place between user modules using message passing</p><ul><li>Microkernels provide minimal process and memory management, in addition to a communication facility.</li><li>Communication between user modules through message passing. <img src="https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@master/IMAGE/OS/Microkernels.png" alt=""></li></ul><p>Advantage</p><ul><li>Easier to <ul><li>extend to a microkernel</li><li>port the operating system to new architectures</li></ul></li><li>More reliable (less code is running in kernel mode)</li><li>More secure</li></ul><p>Disadvantages</p><ul><li>Overhead of communication between user space and kernel space</li></ul><h3 id="modules" tabindex="-1"><strong>Modules</strong> <a class="header-anchor" href="#modules" aria-label="Permalink to &quot;**Modules**&quot;">​</a></h3><p>Many modern operating systems implement loadable kernel modules (best practice)</p><ul><li>Uses object-oriented approach</li><li>Each core component is separate, is loadable as needed within the kernel, talks to the others over known interfaces</li></ul><p>Overall, similar to layers but with more flexible E.g., Linux, Solaris, macOS, Windows, etc</p><h3 id="hybrid-systems" tabindex="-1"><strong>Hybrid Systems</strong> <a class="header-anchor" href="#hybrid-systems" aria-label="Permalink to &quot;**Hybrid Systems**&quot;">​</a></h3><p>Most modern operating systems: not one pure model (structure)</p><ul><li>Hybrid combines multiple approaches to address performance, security, usability needs.</li></ul><p>Example</p><ul><li>Linux and Solaris kernels: monolithic (in kernel memory), plus modular (for dynamic loading of functionality)</li><li>Windows mostly monolithic, plus microkernel for different subsystem personalities, also provide support for dynamically loadable kernel modules.</li><li>Apple Mac OS X, Microkernel plus layered, Aqua (GUI) plus Cocoa (API) programming environment</li></ul><h2 id="operating-system-boot" tabindex="-1"><strong>Operating System Boot</strong> <a class="header-anchor" href="#operating-system-boot" aria-label="Permalink to &quot;**Operating System Boot**&quot;">​</a></h2><ul><li><p>When power is initialized on system, execution starts at a fixed memory location</p></li><li><p>Operating system must be made available to hardware so hardware can start it</p><ul><li>One step process <ul><li>Small piece of code – bootstrap loader<code>引导程序</code>, BIOS<code>基本输入输出系统</code> stored in ROM or EEPROM locates the kernel, loads it into memory, and starts it</li></ul></li><li>Two step process <ul><li>ROM code loads boot block (with bootstrap loader) in hard disk</li><li>Bootstrap loader loads kernel</li></ul></li></ul></li><li><p>Bootstrap loader <code>引导程序</code> -----simple code to initialize the system</p><ul><li>Load Kernel</li><li>Starts system daemons <code>守护进程</code> (services provided outside of the kernel)</li></ul></li></ul>',40))])}const b=s(o,[["render",d]]);export{f as __pageData,b as default};