import{_ as d,c as e,a5 as r,o as h}from"./chunks/framework.CcAzSe5T.js";const c=JSON.parse('{"title":"CV-HW-2","description":"","frontmatter":{"date":"2024-09-11T00:00:00.000Z","title":"CV-HW-2","status":"DONE","author":["AllenYGY"],"tags":["CV","HOMEWORK"]},"headers":[],"relativePath":"posts/Computer Vision/Homework/CV-HW-2.md","filePath":"posts/Computer Vision/Homework/CV-HW-2.md","lastUpdated":null}'),a={name:"posts/Computer Vision/Homework/CV-HW-2.md"};function o(n,t,s,l,i,p){return h(),e("div",null,t[0]||(t[0]=[r('<h1 id="cv-hw-2" tabindex="-1">CV-HW-2 <a class="header-anchor" href="#cv-hw-2" aria-label="Permalink to &quot;CV-HW-2&quot;">​</a></h1><p>Given an image, filter the image with cross-correlation and convolution, respectively.</p><p><strong>Cross-correlation:</strong></p><table tabindex="0"><thead><tr><th>1</th><th>2</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr><tr><td>3</td><td>3</td><td>4</td><td>4</td><td>5</td><td>6</td></tr><tr><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr></tbody></table><p>Filter:</p><table tabindex="0"><thead><tr><th>1</th><th>2</th><th>1</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>-1</td><td>-2</td><td>-1</td></tr></tbody></table><p>Result:</p><table tabindex="0"><thead><tr><th>-6</th><th>-6</th><th>5</th><th>-4</th></tr></thead><tbody><tr><td>-8</td><td>-8</td><td>-8</td><td>-8</td></tr></tbody></table><p><strong>Convolution:</strong></p><table tabindex="0"><thead><tr><th>1</th><th>2</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr><tr><td>3</td><td>3</td><td>4</td><td>4</td><td>5</td><td>6</td></tr><tr><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr></tbody></table><p>Filter:</p><table tabindex="0"><thead><tr><th>1</th><th>2</th><th>1</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>-1</td><td>-2</td><td>-1</td></tr></tbody></table><p>Result:</p><table tabindex="0"><thead><tr><th>6</th><th>6</th><th>-5</th><th>4</th></tr></thead><tbody><tr><td>8</td><td>8</td><td>8</td><td>8</td></tr></tbody></table>',14)]))}const m=d(a,[["render",o]]);export{c as __pageData,m as default};