<template>
    <div>
        <Header></Header>
        <div class="content">
            <div class="contain_content">
                <h3 class="title">{{blog.title}}</h3>
                <el-link icon="el-icon-edit" v-if="ownBlog">
                    <router-link :to="{name: 'BlogEdit', params:{blogId: blog.id}}"> 编辑</router-link>
                </el-link>
                <el-divider></el-divider>
                <div class="description">{{blog.description}}</div>
                <el-divider></el-divider>
                <div v-html="blog.content"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";

    export default {
        name: "BlogDetail.vue",
        components: {Header},
        data() {
            return {
                blog: {
                    userId: null,
                    id: "",
                    title: "",
                    content: "",

                },
                ownBlog: false
            }
        },
        created() {
            const blogId = this.$route.params.blogId
            console.log("blogId:" + blogId)
            const _this = this
            this.$axios.get("/blog/query/" + blogId).then(res => {
                const blog = res.data.data
                _this.blog.id = blog.id
                _this.blog.title = blog.title
                _this.blog.description = blog.description
                _this.blog.content = blog.content
                _this.blog.userId = blog.userId
                console.log("userId:"+_this.$store.state.userId)
                _this.ownBlog = (_this.blog.userId === _this.$store.getters.getUser.id)
            })
        }
    }
</script>

<style scoped>
    .content {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin: 0 auto;
        min-height: 700px;
    }

    .contain_content {
        margin: 15px 10px;
    }

    .title {
        text-align: center;
    }
</style>
