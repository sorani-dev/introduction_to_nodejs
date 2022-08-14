
const path = require('path')
const AutoLoad = require('@fastify/autoload')
const cors = require('@fastify/cors')
const fastify = require("fastify")




const app = fastify()


 function build(opts) {
  const app = fastify()
  
  /* app.addHook('onSend', (req, repy, done) => {
  reply.setHeader('Access-Control-Allow-Origin', '*')
  done()
})

true,
});*/

/**
 * Registering an `onSend` hook in the root encapsulation context.
 */
app.addHook("onSend", async function (request, reply) {
	reply.headers({
		"Cache-Control": "no-store",
		Pragma: "no-cache",
		'Access-Control-Allow-Origin': '*',
	});
});

   /* app.register(require('@fastify/middie'), {
    hook: 'onRequest' // default
  })m/
  // do you know we also have cors support?
  // https://github.com/fastify/fastify-cors
  // app.use(require('cors')())
  // fsstify.use(cors)
  /*await app.register(cors, {
origin: '*'
})*/
 // await 
/*app.register(cors, { 
  // put your options here
})*/
// await app.register(cors)
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
   /*app.register(AutoLoad, {     dir: path.join(__dirname, 'plugins'),     options: Object.assign({}, opts)   })*/
app.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  options: Object.assign({}, opts) 
  // dirNameRoutePrefix: false // lack of prefix will mean no prefix, instead of directory name})
})

/* 
app.get("/", async (request, reply) => {
    return { hello: "world" };
  });
  */

/* app.register(cors, (instance) => {
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



  /*app.register(require('fastify(cors'), { 
    origin: true,
    methods: ["GET","POST", "DELETE", "PUT", "PATCH"]
    })*/
    
    //. app.use(require('cors')())
  
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
    // await app.log.info(`server listening on ${app.server.address().port}`);


  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

if (require.main === module) {
  start();
}