// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring')

var templates = require('./templates.js')          // Ensure templates file is present
var static = require('./static.js')             // Ensure static.js file is present

// Aux functions to collect POST data
function collectRequestBodyData(request, callback) {
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation
var alunosServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16) // Current date for logging
    console.log(req.method + " " + req.url + " " + d)

    // Handle static resources (like CSS, JS, Images)
    if (static.staticResource(req)) {
        static.serveStaticResource(req, res)
    } else {
        switch (req.method) {
            case "GET":
                // GET /alunos --> List all students
                if (req.url === "/alunos" || req.url === "/") {
                    axios.get('http://localhost:5000/alunos')
                        .then(resp => {
                            const data = resp.data
                            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write(templates.studentsListPage(data, d))
                            res.end()
                        })
                        .catch(err => {
                            console.log("Erro: " + err)
                            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write(templates.errorPage(err, d))
                            res.end()
                        })
                }
                // GET /alunos/:id --> View a specific student's details
                else if (req.url.match(/\/alunos\/A\d+$/)) {
                    const id = req.url.split('/')[2]
                    axios.get(`http://localhost:5000/alunos/${id}`)
                        .then(resp => {
                            const data = resp.data
                            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write(templates.studentPage(data, d))
                            res.end()
                        })
                        .catch(err => {
                            console.log("Erro: " + err)
                            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write(templates.errorPage(err, d))
                            res.end()
                        })
                }
                // GET /alunos/registo --> Show the registration form
                else if (req.url === "/alunos/registo") {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(templates.studentFormPage(d))
                    res.end()
                }
                // GET /alunos/edit/:id --> Show the edit form for a specific student
                else if (req.url.match(/\/alunos\/edit\/A\d+$/)) {
                    const id = req.url.split('/')[3]
                    axios.get(`http://localhost:5000/alunos/${id}`)
                        .then(resp => {
                            const data = resp.data
                            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write(templates.studentFormEditPage(data, d))
                            res.end()
                        })
                        .catch(err => {
                            console.log("Erro: " + err)
                            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write(templates.errorPage(err, d))
                            res.end()
                        })
                }
                // GET /alunos/delete/:id --> Delete a student
                else if (req.url.match(/\/alunos\/delete\/A\d+$/)) {
                    const id = req.url.split('/')[3]
                    axios.get(`http://localhost:5000/alunos/${id}`)
                        .then(resp => {
                            const data = resp.data
                            axios.delete(`http://localhost:5000/alunos/${id}`)
                                .then(() => {
                                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                                    res.write(templates.studentPage(data, d, " deleted"))
                                    res.end()
                                })
                                .catch(err => {
                                    console.log("Erro: " + err)
                                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                                    res.write(templates.errorPage(err, d))
                                    res.end()
                                })
                        })
                        .catch(err => {
                            console.log("Erro: " + err)
                            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write(templates.errorPage(err, d))
                            res.end()
                        })
                }
                else {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(templates.errorPage(404, d))
                    res.end()
                }
                break

            case "POST":
                // POST /alunos/registo --> Register a new student
                if (req.url === "/alunos/registo") {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            const regex = /^A\d+$/;
                            if (regex.test(result.id)) {
                                axios.post('http://localhost:5000/alunos/', result)
                                    .then(resp => {
                                        const data = resp.data
                                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                                        res.write(templates.studentPage(data, d, " added"))
                                        res.end()
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                                        res.write(templates.errorPage(500, d))
                                        res.end()
                                    })
                            } else {
                                res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' })
                                res.write(templates.errorPage("Invalid ID format", d))
                                res.end()
                            }
                        } else {
                            res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write(templates.errorPage("Missing body data", d))
                            res.end()
                        }
                    })
                }
                // POST /alunos/edit/:id --> Edit student information
                else if (req.url.match(/\/alunos\/edit\/A\d+$/)) {
                    const id = req.url.split('/')[3]
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put(`http://localhost:5000/alunos/${id}`, result)
                                .then(resp => {
                                    const data = resp.data
                                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                                    res.write(templates.studentPage(data, d, " edited"))
                                    res.end()
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                                    res.write(templates.errorPage(500, d))
                                    res.end()
                                })
                        } else {
                            res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write(templates.errorPage("Missing body data", d))
                            res.end()
                        }
                    })
                }
                else {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(templates.errorPage(404, d))
                    res.end()
                }
                break

            default:
                // Other HTTP methods not supported
                res.writeHead(501, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write(templates.errorPage("Method Not Supported: " + req.method, d))
                res.end()
                break
        }
    }
})

// Server listens on port 3000
alunosServer.listen(3000, () => {
    console.log(`Server running at http://localhost:${3000}/`)
})