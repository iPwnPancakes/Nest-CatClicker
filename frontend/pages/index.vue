<template>
  <div class="container">
    <NuxtLink to="/login">Coffee</NuxtLink>
  </div>
</template>

<script lang="ts">
import {
  CBox,
  CButton,
  CAvatarGroup,
  CAvatar,
  CAvatarBadge,
  CModal,
  CModalContent,
  CModalOverlay,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalCloseButton,
  CIconButton,
  CFlex,
  CHeading
} from "@chakra-ui/vue";

export default {
  name: "App",
  components: {
    CBox,
    CButton,
    CAvatarGroup,
    CAvatar,
    CAvatarBadge,
    CModal,
    CModalContent,
    CModalOverlay,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CModalCloseButton,
    CIconButton,
    CFlex,
    CHeading
  },
  inject: ["$chakraColorMode", "$toggleColorMode"],
  data() {
    return {
      showModal: false,
      mainStyles: {
        dark: {
          bg: "gray.700",
          color: "whiteAlpha.900"
        },
        light: {
          bg: "white",
          color: "gray.900"
        }
      }
    };
  },
  computed: {
    
  },
  methods: {
    
  }
};
</script>
