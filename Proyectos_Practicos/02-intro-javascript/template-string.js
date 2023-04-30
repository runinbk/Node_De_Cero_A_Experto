// # Templates Literales

const nombre = "Deadpool";
const real = "Wade Winston";

/// normal literal
const normal = nombre + " " + real;

/// templates
const template = `${nombre} ${real}`;

console.log(normal);
console.log(template);

console.log(normal === template);

const html = `
<h1>Hola</h1>
<p>Mundo</p>
`;

console.log(html);
