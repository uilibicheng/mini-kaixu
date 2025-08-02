export default Behavior({
  data: {
    visible: false,
    timeout: 300,
  },
  methods: {
    preventDefault: function () {},
    controlVisible: function (bool) {
      this.setData({
        visible: bool,
      })
    },
    closeModal: function (fn) {
      this.controlVisible(false)
      setTimeout(fn, this.data.timeout)
    },
    onClose: function () {
      this.closeModal(() => {
        this.triggerEvent('visible', { visible: false })
      })
    },
  },
})
