<template>
    <div>
        <Header></Header>
        <div class="main_content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <mavon-editor v-model="ruleForm.content"></mavon-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";

    export default {
        name: "BlogEdit.vue",
        components: {Header},
        data() {
            return {
                ruleForm: {
                    title: '',
                    description: '',
                    content: '',
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请填写摘要', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '请填写内容', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        this.$axios.post("/blog/save/", this.ruleForm, {
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        }).then(res => {
                            this.$alert('操作成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$router.push("/blogs")
                                    console.log(res + action)
                                }
                            });
                        })
                    }
                })
            }
        },
        created() {
            const blogId = this.$route.params.blogId
            if (blogId) {
                const _this = this
                this.$axios.get("/blog/query/"+ blogId).then(res =>{
                    _this.ruleForm.title = res.data.data.title
                    _this.ruleForm.description = res.data.data.description
                    _this.ruleForm.content = res.data.data.content
                })
            }
        }
    }
</script>

<style scoped>

</style>
