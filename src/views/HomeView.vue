<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import ResponseModal from '@/components/ResponseModal.vue';
import LoginBase from '@/components/LoginBase.vue';

const user = ref({
  email: '',
  password: '',
});

const formHelper = ref({
  email: '',
  password: '',
});

const modalKey = ref(1);
const is_error = ref(false);
const modalMessage = ref('');
const waiting = ref(false);
const validated = ref(false);

function login() {
  const lUser = { ...user.value };
  // const lUser = {
  //   username: user.value.email,
  //   password: user.value.password,
  // };
  console.log(lUser.email);
  console.log(lUser.password);

  waiting.value = true;

  // hr.toplearnr.com/recruitment/Api/endpoint/
  return axios
    .get('https://hr.toplearnr.com/recruitment/Api/endpoint/', {
      params: lUser,
    })
    .then((resp) => {
      // if (resp.status == 200) {
      //   is_error.value = false;
      //   modalMessage.value = 'Login Successfull';
      //   document.getElementById('responseModalToggle')?.click();
      // }
      if (resp.data.code == 401) {
        is_error.value = true;
        modalMessage.value = resp.data.msg;
        document.getElementById('responseModalToggle')?.click();
      } else if (resp.data.code == 200) {
        is_error.value = false;
        modalMessage.value = 'Login Successfull';
        document.getElementById('responseModalToggle')?.click();
      }
    })
    .catch((err) => {
      console.log(err);
      is_error.value = true;
      modalMessage.value = 'Something went wrong, try again';
      document.getElementById('responseModalToggle')?.click();
    });
}

function handleSuccess() {
  waiting.value = false;
  user.value.email = '';
  user.value.password = '';
  formHelper.value.email = '';
  formHelper.value.password = '';
}

function handleError() {
  waiting.value = false;
  formHelper.value.email = '';
  formHelper.value.password = '';
}

function validateEmail() {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  if (user.value.email.length == 0) {
    formHelper.value.email = 'required';
    isValidated();
  } else if (!re.test(user.value.email)) {
    formHelper.value.email = 'must be a valid email';
    isValidated();
  } else {
    formHelper.value.email = '';
    isValidated();
  }
}

function validatePassword() {
  if (user.value.password.length == 0) {
    formHelper.value.password = 'required';
    isValidated();
  } else if (user.value.password.length < 4) {
    formHelper.value.password = 'atleast 4 characters';
    isValidated();
  } else {
    formHelper.value.password = '';
    isValidated();
  }
}

function isValidated() {
  if (!formHelper.value.email && !formHelper.value.password) {
    validated.value = true;
  } else {
    validated.value = false;
  }
}
</script>

<template>
  <LoginBase>
    <form class="mt-8 space-y-4" @submit.prevent="login">
      <div class="form-control">
        <label class="label text-primary" for="email">
          <span>Email</span>
        </label>
        <input
          id="email"
          type="text"
          placeholder="john@doe.com"
          class="input w-full ease-in-out transition-all"
          :class="{
            'input-primary': !formHelper.email,
            'input-error': formHelper.email,
          }"
          require
          v-model="user.email"
          @keyup="validateEmail"
        />
        <div
          class="text-error font-bold"
          :class="{
            '': !formHelper.email,
            'mt-2': formHelper.email,
          }"
        >
          {{ formHelper.email }}
        </div>
      </div>

      <div class="form-control">
        <label class="label text-primary" for="password">
          <span>Password</span>
        </label>
        <input
          id="password"
          type="password"
          placeholder="********"
          class="input input-primary w-full ease-in-out transition-all"
          :class="{
            'input-primary': !formHelper.password,
            'input-error': formHelper.password,
          }"
          required
          v-model="user.password"
          @keyup="validatePassword"
        />
        <div
          class="text-error font-bold"
          :class="{
            '': !formHelper.password,
            'mt-2': formHelper.password,
          }"
        >
          {{ formHelper.password }}
        </div>
      </div>

      <div class="flex justify-center">
        <button
          type="submit"
          class="btn btn-wide rounded-full btn-primary"
          :class="{
            'loading btn-disabled': waiting,
            'btn-outline btn-disabled': !validated,
          }"
        >
          Submit
        </button>
      </div>
      <div
        class="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500"
      >
        <span>Don't have an account?</span>
        <p
          class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
        >
          Sign up
        </p>
      </div>
    </form>
  </LoginBase>

  <ResponseModal
    :key="modalKey"
    :message="modalMessage"
    :is_error="is_error"
    @error-modal-closed="handleError"
    @success-modal-closed="handleSuccess"
  />
</template>

<style scoped>
.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  animation: animate 25s linear infinite;
  bottom: -150px;
}
.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}
@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 80%;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 0%;
  }
}
</style>
