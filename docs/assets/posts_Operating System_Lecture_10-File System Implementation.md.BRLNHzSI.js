import{_ as t,c as i,a5 as l,o}from"./chunks/framework.CcAzSe5T.js";const u=JSON.parse('{"title":"10-File System Implementation","description":"","frontmatter":{"date":"2024-05-11T00:00:00.000Z","title":"10-File System Implementation","status":"TOBECONTINUED","author":["AllenYGY"],"tags":["NOTE"],"created":"2024-05-11T14:08","updated":"2024-06-11T01:14"},"headers":[],"relativePath":"posts/Operating System/Lecture/10-File System Implementation.md","filePath":"posts/Operating System/Lecture/10-File System Implementation.md","lastUpdated":null}'),a={name:"posts/Operating System/Lecture/10-File System Implementation.md"};function n(s,e,r,m,d,p){return o(),i("div",null,e[0]||(e[0]=[l('<h1 id="file-system-implementation" tabindex="-1">File System Implementation <a class="header-anchor" href="#file-system-implementation" aria-label="Permalink to &quot;File System Implementation&quot;">​</a></h1><ul><li>File-System Structure</li><li>File-System Operations</li><li>Directory Implementation</li><li>Allocation Methods</li><li>Free-Space Management</li><li>Efficiency and Performance</li></ul><ol><li>Why a file system is organized in layers?</li></ol><ul><li><em><strong>Minimize the duplication of code</strong></em></li><li>File system organized into layers</li><li>Each layer in the design uses the features of lower layers to create new features.</li></ul><ol start="2"><li>What are two categories of structures used in file system implementation?</li></ol><ul><li>On-disk (on-storage) structures</li><li>In-memory structures</li></ul><ol start="3"><li>What is File Control Block or inode?</li></ol><ul><li>Each file has a File Control Block or inode</li></ul><ol start="4"><li>What open file tables are there in an operating system? What are they used for?</li></ol><ul><li><p>Search the directory structure on disk for the file and copy the content of entry （metadata） to system-wide open file table if the file is opened for the first time</p></li><li><p>Update the per-process open-file table by adding a pointer to system-wide open file table</p></li></ul><ol start="5"><li>What methods are used to allocate disk blocks to files？</li></ol><ul><li>Contiguous allocation(not common now)</li><li>Linked allocation (e.g. FAT32 in Windows)</li><li>Indexed allocation (e.g. ex3 in Unix)</li></ul><ol start="6"><li>What are main methods used to manage free space on disk?</li></ol><ul><li>Bit Map</li><li>Linked List</li><li>Grouping</li><li>Counting</li></ul>',14)]))}const f=t(a,[["render",n]]);export{u as __pageData,f as default};