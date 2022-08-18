
const path = require('path')
const AutoLoad = require('@fastify/autoload')
const cors = require('@fastify/cors')
const fastify = require("fastify")

function build(opts) {
  const app = fastify({logger: true})

/**
 * Registering an `onSend` hook in the root encapsulation context.
 */
/*app.addHook("onSend", async function (request, reply) {
  reply.headers({
    "Cache-Control": "no-store",
     Pragma: "no-cache",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
});*/

app.register(cors, { 
  // put your options here

  /*origin: (origin, cb) => {
    const hostname = new URL(origin).hostname
    if(hostname === "localhost"){
    //  Request from localhost will pass
      cb(null, true)
      return
    }
    // Generate an error on other origins, disabling access
    cb(new Error("Not allowed"), false)
  }*/
})

// Configuring CORS Asynchronously
/*app.register(cors, (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: '*'
    };

    // do not include CORS headers for requests from localhost
    /*if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }*

    // callback expects two parameters: error and options
    callback(null, corsOptions)
  }
})*/

app.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  options: Object.assign({}, opts) 
  // dirNameRoutePrefix: false // lack of prefix will mean no prefix,  of directory name})
}).after(err => {
  if (err) {
    throw err
  }
})

app.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  options: Object.assign({}, opts) 
  // dirNameRoutePrefix: false // lack of prefix will mean no prefix,  of directory name})
}).after(err => {
  if (err) {
    throw err
  }
})

/* 
app.get("/", async (request, reply) => {
    return { hello: "world" };
  });
*/

  app.get(
    "/hello",
    {
      query: {
        name: {
          type: "string"
        }
      }
    },
    async (request, reply) => {
      const { name } = request.query;
      return { hello: name || "no name!" };
    }
  );
  
  return app;
}

async function start() {
  const app = build({ logger: true });
  try {
    await app.listen(3000)
    app.log.info(`server listening on ${app.server.address().port}`)
    
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

if (require.main === module) {
  start();
}