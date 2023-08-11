import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.css'

hljs.configure({
  languages: ['javascript', 'typescript', 'ruby', 'python', 'cpp', 'c']
});

window.hljs = hljs;