'use babel'
import BaseElement from './BaseElement'

export default Object.assign({}, BaseElement, {
    init(args = {}) {
        this.createElement(args)
        this.initEvent(args)
        this.inject(args.parent)
        return this
    },
    createElement(args) {
        const div = document.createElement('div')
        this.element = div
        div.className = 'checkGroupItem'
        const label = document.createElement('label')
        const span = document.createElement('span')
        const radio = document.createElement('input')

        span.textContent = args.title
        radio.type = 'radio'
        radio.name = args.radioName
        radio.value = args.value
        radio.checked = args.checked

        label.append(radio)
        label.append(span)

        this.value = args.value
        this.radio = radio
        this.label = label

        this.element.append(label)
    },
    initEvent(args) {
        this.selectCb = args.onSelect || (() => {})
        this.label.addEventListener('click', (e) => {
            this.selectCb(this.getSelectMsg())
        })
    },
    getSelectMsg() {
        return {
            value: this.getValue(),
            text: null,
        }
    },
    changeToState(value) {
        this.radio.disabled = !value
    },
    clear() {
        this.radio.checked = false
    },
    isEditable() {
        return !this.radio.disabled
    },
    enable() {
        this.changeToState(true)
    },
    disable() {
        this.changeToState(false)
    },
    getValue() {
        return this.value
    },
    activate() {
        this.radio.checked = true
        this.selectCb(this.getSelectMsg())
    },
})
