import { reactive, watch } from "vue"

const profile = reactive(
  JSON.parse(localStorage.getItem("profile")) || {
    name: "Guest User",              // ✅ default string value
    email: "guest@example.com",      // ✅ default string value
    bio: "Tell us about your roots 🌿",
    avatar: "",
  }
)

export function useProfile() {
  const saveProfile = (updated) => {
    Object.assign(profile, updated)
    localStorage.setItem("profile", JSON.stringify(profile))
  }

  const updateAvatar = (avatarData) => {
    profile.avatar = avatarData
    localStorage.setItem("profile", JSON.stringify(profile))
  }

  const loadProfile = () => {
    const stored = localStorage.getItem("profile")
    if (stored) Object.assign(profile, JSON.parse(stored))
  }

  watch(profile, (newVal) => {
    localStorage.setItem("profile", JSON.stringify(newVal))
  })

  return { profile, saveProfile, updateAvatar, loadProfile }
}
