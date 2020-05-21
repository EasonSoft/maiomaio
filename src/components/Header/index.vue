<template>
    <header id="header">
        <slot></slot> <h1>{{ title }}</h1>
    </header>
</template>

<script>
export default {
    name : 'Header',
    props : {
        title : {
            type : String,
            default : '喵喵电影'
        }
    }
}
</script>

<style scoped>
#header{width:100%; height:50px; color: #fff; background: #e54847; border-bottom: 1px solid #e54847; position: fixed;top:0;left:0;z-index: 10;}
#header h1{ font-size: 18px; text-align: center; line-height: 50px; font-weight: normal; }
#header img{ position: absolute; left: 5px; top: 50%;height: 40px; margin-top: -17px; font-size: 26px;}
</style>
