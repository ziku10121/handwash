
const routes = [

  //{ path: '/', component: () => import('pages/te200.vue') },
   { path: '/', component: () => import('layouts/Layout.vue'),
     children: [
      { path: '', component: () => import('pages/handwash.vue') },
      { path: '/handwash', component: () => import('pages/handwash.vue') },
      { path: '/upload', component: () => import('pages/upload.vue') },
    ]
   },
   { path: '/:catchAll(.*)*',  redirect: '/handwash' }
]
// if (process.env.MODE !== 'ssr') {
//   routes.push({
//     path: '*',
//     component: () => import('pages/Error404.vue')
//   })
// }

export default routes
