# Creating the Spotify  by Shika

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



## using proxy for connect the back to froent end in vite config.js


  server:{
    proxy:{
      "/api":{
        target:"http://localhost:5000"
      }
    }
  }


## Multer using backend
A Node.js middleware for handling file uploads from forms (multipart/form-data).
What it does:

Receives files from frontend
Temporarily stores them (memory or disk)
Makes file data accessible in your route handlers



## Cloudinary
A cloud service for storing and managing media files (images, videos). Instead of saving files on your own server, you upload them to Cloudinary's servers.
Why use it?

Free tier available
Automatic image optimization & resizing
CDN delivery (fast loading worldwide)
No server storage needed

##    const formData =new FormData() 
 // FormData --Create a special container to upload both text + files properly.
