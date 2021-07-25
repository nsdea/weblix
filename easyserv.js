// ---------
// RESOURCES
// ---------
const FAVICON = `AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAGFhYQBiYmIAYmJiAGJiYgBiYmIAYmJiAGJiYgBiYmIAYmJiAGJiYgBi
        YmIAYmJiAGJiYgBhYWEAAAAAAGFhYQViYmKsYmJiyWJiYsliYmLJYmJiyWJiYsliYmLJYmJiyWJi
        YsliYmLJYmJiyWJiYsliYmLJYmJiq2JiYgViYmIbYmJizmNjYx1jY2MdY2NjHWNjYx5jY2MeY2Nj
        HmNjYx5jY2MeY2NjHWNjYxxjY2McY2NjHGJiYs5iYmIbYmJiG2JiYshiYmJLYmJifmJiYn5iYmLi
        YmJi4mJiYuJiYmLiYmJi4mJiYpgAAAAAAAAAAGRkZABiYmLIYmJiG2JiYhtiYmLUYmJiNmJiYjZi
        YmI2YmJiNmJiYjZiYmI2YmJiNmJiYjZiYmI2YmJiN2JiYjdiYmI2YmJi1GJiYhtiYmIbYmJi7WJi
        YqtiYmKrYmJiq2JiYqtiYmKrYmJiq2JiYqtiYmKrYmJiq2JiYqtiYmKrYmJiq2JiYu1iYmIbYmJi
        G2JiYshiYmIlYmJiP2JiYj9iYmJxYmJicWJiYnFiYmJxYmJicWJiYkwAAAAAAAAAAGRkZABiYmLI
        YmJiG2JiYhtiYmLIYmJiJWJiYj9iYmI/YmJicWJiYnFiYmJxYmJicWJiYnFiYmJMAAAAAAAAAABk
        ZGQAYmJiyGJiYhtiYmIbYmJi7WJiYqtiYmKrYmJiq2JiYqtiYmKrYmJiq2JiYqtiYmKrYmJiq2Ji
        YqtiYmKqYmJipGJiYu1iYmIbYmJiG2JiYtRiYmI2YmJiNmJiYjZiYmI2YmJiNmJiYjZiYmI2YmJi
        NmJiYjZiYmI3YmJiH1xiYwxiYmI7YmJiDWJiYhtiYmLIYmJiS2JiYn5iYmJ9YmJi4WJiYuFiYmLh
        YmJi4WJiYuFiYmJ03HMyG9xzMrHcczLb3HMyg9xzMQJiYmIbYmJizmNjYx1jY2MdY2NjHWNjYx5j
        Y2MeY2NjHmNjYx5jY2MdXGFjAtxzMrHcczL/3HMy/9xzMv/cczJcYmJiBWJiYqxiYmLJYmJiyWJi
        YsliYmLJYmJiyWJiYsliYmLJYmJiw1phYwjcczLb3HMy/9xzMv/cczL/3HMyhgAAAABhYWEAYmJi
        AGJiYgBiYmIAYmJiAGJiYgBiYmIAYmJiAGJiYgBKXmMA3HMyhNxzMv/cczL/3HMy+dxzMjUAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN1xMwLcczJd3HMyhtxzMjaz
        dScA//8AAP//AAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAcAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAD/4AAA/+EAAA==`

const PACKAGEJSON = {
    "dependencies": {
        "dotenv": "^10.0.0",
        "ejs": "^3.1.6",
        "express": "^4.17.1",
        "express-ejs-layouts": "^2.5.1",
        "marked": "^2.1.3",
        "qrcode": "^1.4.4",
        "serve-favicon": "^2.5.0",
        "gray-matter": "^4.0.3"
    },
    "name": "easyserv",
    "version": "1.0.0",
    "main": "easyserv.js",
    "devDependencies": {
        "nodemon": "^2.0.12"
    },
    "scripts": {
        "serv": "nodemon  -w . -w .env easyshare.js"
    },
    "keywords": [],
    "author": "Stevetec",
    "license": "ISC",
    "description": "The ultimate hackerthon webserver"
}

const errorpage = `<!DOCTYPE html><meta charset=utf-8><meta content="width=device-width,initial-scale=1"name=viewport><title>EasyServ Error</title><link href=https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css rel=stylesheet><section class="hero is-danger"><div class=hero-body><p class=title>EasyServ.js<p class=subtitle>The ultimate Hackerthon webserver</div></section><section class=section><div class=container><div class=box><div class=content>$content</div></div></div></section>`
var welcomepage = `
# EasyServ.js

> The ultimate hackerthon webserver

### Your server is up and running correctly

Start building your awsome website by creating

\`\`\`
/pages/index.ejs
\`\`\`

and start creating right away!
` // Has to be ar because it's rendered and redefined later

// ----
// CODE
// ----

// fs for filesystem support [fsp used if promises can be used to make stuff faster]
var fsp = require('fs/promises');
var fs = require('fs')

// Check dependency status
try {
    require('express') // if one is missing they probably forgot to install
} catch (e) { // dependencies not installed, load
    // Package.json to be dumped on first run
    console.log("dependencies missing, installing");
    fs.writeFileSync('package.json', JSON.stringify(PACKAGEJSON))
    const {
        execSync
    } = require('child_process');
    execSync('npm i')

    console.log('Done. run your server using:\n')
    console.log('npm run serv');
    process.exit(42)
}


// configure from .env if it exists
var dotkeys = require('dotenv').config()
dotkeys = dotkeys.parsed || {}
// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
// Dynamically generate routes from paths with $prefix

Array.from([
    './views/layouts',
    './views/pages',
    './views/components',
    './content/json',
    './content/markdown',
    './public'
]).forEach((v, i) => {
    fs.mkdirSync(v, {
        recursive: true
    })
})

// See if a specified layout or 'layouts/layout.ejs' expists, if not, no layouts will be used
LAYOUT = 'layouts/' + (process.env.LAYOUT || 'layout')

NOLAYOUT = !fs.existsSync(`./views/${LAYOUT}.ejs`)
if (NOLAYOUT) {
    console.log("No layout file specified or the specified file couldn't be found, layouts are not used");
}

var path = require('path');

// View crawler that generates page routes
var walk = function(dir, donefunc) {
    const done = (err, res) => {
        if (err) {
            console.log("Route generator: Crawler failed: " + err);
            return
        }
        res = res.map(x => x.replace(path.resolve(process.cwd(), 'views/pages'), '').replace('\\', '/').replace('$', ':').replace('.ejs', ''))
        donefunc(err, res)
    }
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

// configue express
const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
const layouts = require('express-ejs-layouts')
app.use(layouts)


// allows async calls in templates
let ejsOptions = {
    async: true
};

//https://stackoverflow.com/a/62455053
const ejs = require('ejs')
app.engine('ejs', async (path, data, cb) => {
    try {
        let html = await ejs.renderFile(path, data, ejsOptions);
        cb(null, html);
    } catch (e) {
        cb(e, '');
    }
});


// Marked.js wrapper that auto-targets the 'content/markdown' folder
const marked = require('marked');
const matter = require('gray-matter');
welcomepage = marked(welcomepage) // render welcome template now that we have 'marked'
async function markdown(resref, filename) {
    const target = path.resolve(process.cwd(), 'content/markdown', filename) + '.md'
    try {
        var file = (await fsp.readFile(target)).toString()
        file = matter(file)
        if (Object.keys(file.data).length === 0 && file.data.constructor === Object) {
            return marked(file.content)
        } else {
            return {
                content: marked(file.content),
                data: file.data
            }
        }
    } catch (e) {
        console.log(`md(): cannot load Markdown file ${target}: ${e}`);
        resref.completed = true
        resref.redirect('/404')
    }
}
// loads and parses JSON files fro content/json
async function jsonloader(resref, filename) {
    const target = path.resolve(process.cwd(), 'content/json', filename) + '.json'
    try {
        const file = (await fsp.readFile(target)).toString()
        return JSON.parse(file)
    } catch (e) {
        console.log(`json(): cannot load JSON file ${target}: ${e}`);
        resref.completed = true
        resref.redirect('/404')
    }
}

// QRcode rendering helper
const qrcode = require('qrcode')
async function qr(text) {
    return await qrcode.toDataURL(text, {
        scale: 15
    })
}

// Generate locals for any route including wrapped functions
function locals(req, res) {
    let out = {
        ...req.params,
        ...dotkeys,
        md: async (filename) => await markdown(res, filename),
        json: async (filename) => await jsonloader(res, filename),
        qr,
        async: true,
        layout: LAYOUT
    }
    if (NOLAYOUT) {
        out.layout = false // set 'layout' to false so it's not used
    }
    return out
}

// register routes
walk('./views/pages', (err, routes) => {
    if (err) {
        console.log('error while crawling views/pages:');
        console.log(err);
        return
    }
    for (let i = 0; i < routes.length; i++) {
        console.log(`adding route ${routes[i]}`);
        app.get(routes[i], (req, res) => {
            try {
                console.log('rendering ' + req.url);
                res.completed = false
                res.render(
                    `pages/${routes[i].replace(':','$')}`,
                    locals(req, res),
                    (err, html) => {
                        if (err) {
                            res.send(errorpage.replace('$content', err))
                        } else if (!res.completed) {
                            res.send(html)
                        }
                    }
                )
            } catch (e) {}
        })
    }
    // Static routes [always exist]
    app.use('/', express.static('public'))
    app.get('/', (req, res) => {
        res.render(
            'pages/index',
            locals(req, res),
            (err, html) => {
                if (err) {
                    if (err.toString().startsWith('Error: Failed to lookup view "pages/index" in views directory')) { // index 404
                        // we assume that a view lookup error only occurs on first launch...
                        res.status(404).send(errorpage.replace('hero is-danger', 'hero is-success is-medium').replace('EasyServ Error', 'EasyServ').replace('$content', welcomepage))
                    } else {
                        res.send(errorpage.replace('$content', err))
                    }
                } else if (!res.completed) {
                    res.send(html)
                }
            }
        )
    })
    // If no FAVICON is provided we serve one
    const favicon = require('serve-favicon');
    const imgBuffer = new Buffer.from(FAVICON, 'base64');
    app.use(favicon(imgBuffer));


    app.get('/404', (req, res) => {
        console.log(`Request to ${req.url} cannot be fullfiled, falling back to internal error page`);
        res.completed = false
        res.status(404).send(errorpage.replace('$content', `<h1 class="title">404</h1><h3 class="subtitle">Page not found :(</h3>`))
    })
    app.get('*', (req, res) => {
        res.redirect('/404')
    })

    console.log('EasyServ listening on port ' + (process.env.PORT || 3000));

    app.listen(process.env.PORT || 3000)
})