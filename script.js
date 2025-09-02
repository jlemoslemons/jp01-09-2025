// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("mainNav")
  if (window.scrollY > 100) {
    navbar.classList.add("navbar-scrolled")
  } else {
    navbar.classList.remove("navbar-scrolled")
  }
})

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const nome = formData.get("nome")
  const email = formData.get("email")
  const telefone = formData.get("telefone")
  const mensagem = formData.get("mensagem")

  // Simple validation
  if (!nome || !email || !mensagem) {
    alert("Por favor, preencha todos os campos obrigatórios.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um e-mail válido.")
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...'
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    alert("Mensagem enviada com sucesso! Entrarei em contato em breve.")
    this.reset()
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".testimonial-card, .price-card, .contact-form")

  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Auto-advance testimonial carousel
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("testimonialCarousel")
  if (carousel) {
    const bootstrap = window.bootstrap // Declare the bootstrap variable
    const bsCarousel = new bootstrap.Carousel(carousel, {
      interval: 5000,
      wrap: true,
    })
  }
})

// Add active class to navigation links based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active")
    }
  })
})

// Phone number formatting
document.getElementById("telefone").addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "")
  if (value.length >= 11) {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  } else if (value.length >= 7) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
  } else if (value.length >= 3) {
    value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2")
  }
  e.target.value = value
})

// Add loading states to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (this.getAttribute("href") && this.getAttribute("href").startsWith("#")) {
      return // Skip for anchor links
    }

    const originalText = this.innerHTML
    this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Carregando...'
    this.disabled = true

    setTimeout(() => {
      this.innerHTML = originalText
      this.disabled = false
    }, 1500)
  })
})
