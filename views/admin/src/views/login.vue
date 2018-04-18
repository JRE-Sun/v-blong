<template>
    <el-main class="login-page">
        <div class="login-page__content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item label="用户名:" prop="username">
                    <el-input v-model="ruleForm.username" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input v-model="ruleForm.password" type="password" auto-complete="off" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-page__content-btn" size="medium" type="primary"
                               @click="submitForm('ruleForm')">登陆
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-main>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                },
                rules   : {
                    username: [
                        { required: true, message: '请填写账号', trigger: 'blur' },
                        {min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
                    ],
                },
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    body, html {
        height: 100%;
    }

    .login-page, #app, .el-container {
        height: 100%;
    }

    .login-page {
        position: relative;
    }

    .login-page__content {
        position: absolute;
        top: 35%;
        left: 50%;
        width: 30%;
        transform: translate(-50%, -50%);
    }

    .login-page__content-btn {
        width: 100%;
    }
</style>