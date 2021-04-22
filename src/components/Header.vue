<template>
    <div class="header">
        <h3>欢迎来到MarkerHub的博客</h3>
        <div>
            <el-avatar :size="50" :src="user.avatar"></el-avatar>
        </div>
        <div>{{ user.username }}</div>
        <div class="tools">
            <span><el-link type="primary" href="/blogs">主页</el-link></span>
            <el-divider direction="vertical"></el-divider>
            <span><el-link type="success" href="/blog/add">发表文章</el-link></span>
            <el-divider direction="vertical"></el-divider>
            <span v-show="!hasLogin"><el-link type="warning" href="/login">登录</el-link></span>
            <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "header.vue",
        data() {
            return {
                user: {
                    username: '请先登录',
                    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
                hasLogin: false
            }
        },
        methods: {
            logout() {
                const _this = this
                _this.$axios.get("/sys/logout", {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res => {
                    _this.$store.commit("REMOVE_INFO")
                    _this.$router.push("/login")
                    res.data
                })

            }
        },
        created() {
            let user = this.$store.getters.getUser;
            if (user) {
                this.user.username = user.username
                this.user.avatar = user.avatar
                this.hasLogin = true
            }
        }
    }
</script>

<style scoped>
    .header {
        max-width: 300px;
        margin: auto;
        text-align: center;
    }

    .tools {
        margin: 10px 0;
    }
</style>
