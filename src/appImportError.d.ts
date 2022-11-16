// 在ts项目里面，.ts文件是识别不了.vue文件，.vue文件也识别不了.ts文件，这时候就需要.d.ts声明文件来填好这个坑。这种解决方式要一直打开文件
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }