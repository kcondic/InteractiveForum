<template>
  <Header />
  <main>
    <router-view />
  </main>
</template>

<script>
import Header from '@/components/shared/Header';
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

body {
  margin: 0;
  font-size: 14px;
  font-family: Arial;
  color: $text-color;
}

main {
  padding: 70px 10% 0;
  height: 100vh;

  h1 {
    margin-bottom: 30px;
  }
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    margin-bottom: 20px;
    width: 100%;
    padding: 4px 8px;
    border-radius: 2px;
    outline: none;
    border: 1px solid $text-color;
    background-color: $background-color--light;

    &:invalid {
      box-shadow: none;
    }
  }

  button {
    margin-left: auto;
  }
}

::placeholder {
  color: $text-color--dark;
  opacity: .7;
}

button {
  background-color: $background-color;
  color: $text-color--light;
  outline: none;
  border: none;
  padding: 8px 10px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background-color: $background-color--accent;
  }
}

a {
  text-decoration: none;
  color: $text-color;
}

.switch-auth-type {
  display: flex;
  justify-content: center;
  margin-top: 20px;

  a { 
    margin-left: 5px;
    text-decoration: underline;
  }
}

.dk__error {
  background-color: $error-color !important;
}

.box {
  border-radius: 20px;
  padding: 20px 25%;
  box-shadow: 4px 6px 30px -10px $box-shadow-color;
  background-color: $background-color--light;

  &.wide {
    padding-left: 10%;
    padding-right: 10%;
  }

  &.topic, &.thread {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .title {
      font-size: 18px;
      font-weight: 700;
    }
    
    .user-details {
      display: flex;
      margin-left: auto;

      .author {
        margin-right: 5px;
      }
    }
  }
}
</style>
