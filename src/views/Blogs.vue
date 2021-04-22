<template>
    <div>
        <Header></Header>
        <div class="block">
            <el-timeline>
                <el-timeline-item :timestamp="blog.createTime" placement="top" v-for="blog in blogs" :key="blog.id">
                    <el-card>
                        <h4>
                            <router-link :to="{name: 'BlogDetail', params:{blogId: blog.id}}">
                                {{blog.title}}
                            </router-link>
                        </h4>
                        <p>{{blog.description}}</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <el-pagination class="page_module"
                           background
                           layout="prev, pager, next"
                           :current-page="currentPage"
                           :page-size="pageSize"
                           :total="total"
                           @current-change=page>
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";

    export default {
        name: "Blogs.vue",
        components: {Header},
        data() {
            return {
                blogs: {},
                currentPage: 1,
                pageSize: 5,
                total: 0
            }
        },
        methods: {
            page(currentPage) {
                const _this = this
                _this.$axios.get("/blog/list/" + currentPage + "/5").then(res => {
                    let data = res.data.data;
                    _this.blogs = data.records
                    _this.currentPage = data.current
                    _this.pageSize = data.size
                    _this.total = data.total
                })
            }
        },
        created() {
            this.page(1)
        }
    }
</script>

<style scoped>
    .page_module {
        margin: 0 auto;
        text-align: center;
    }
</style>
