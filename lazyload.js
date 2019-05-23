/**
 * Lazyload 轻量懒加载库
 * 支持懒加载 img、backgroundImage 和 class。
 */

class Lazyload {

  constructor() {
    this.modeList = ['img', 'class']
    this.store = {}
    this.times = Date.now()
  }

  set(options) {
    const { dataset = '', mode = '', offset = 0, delay = 0 } = options
    
    if (!this.modeList.includes(mode)) {
      throw new Error('only supportes \'img\' or \'class\'.')
    }

    if (!dataset) {
      throw new Error('dataset name is required.')
    }

    this.store[dataset] = {
      mode,
      nodes: [...document.querySelectorAll(`[${dataset}]`)]
    }
  
    if (typeof offset === 'string' && offset.indexOf('%') > -1) {
      this.store[dataset].offset = offset.replace('%', '') / 100 * this._getViewportSize().height
    } else {
      this.store[dataset].offset = offset
    }
    
    this.store[dataset].delay = delay

    this.store[dataset]._bindListen = this._listen.bind(this)
    window.addEventListener('scroll', this.store[dataset]._bindListen)

    this._load()
    return this
  }
  // 监听
  _listen() {
    const _now = Date.now()
    if (( _now - this.times) > 25) { // 一秒40帧节流
      this.times = _now
      this._load()
    }
  }
  // 加载
  _load() {
    for (let dataset in this.store) {
      let { mode, nodes, offset, _bindListen, delay } = this.store[dataset]
      nodes = nodes.filter(el => {
        if (this._isInView(el, offset)) {
          switch(mode) {
            case 'img':
              this._delay(delay, () => {
                if (el.tagName.toLocaleLowerCase() === 'img') {
                  el.src = el.getAttribute(`${dataset}`)
                } else {
                  el.style.backgroundImage = `url('${el.getAttribute(`${dataset}`)}')`
                }
              })
              break
            case 'class':
              this._delay(delay, () => {
                const className = el.getAttribute(`${dataset}`)
                el.classList.add(className)
              })
              break
            default:
          }
          return false
        } else {
          return true
        }
      })
      !nodes.length && ( this._remove(_bindListen), delete this.store[dataset] )
    }
  }
  // 延迟
  _delay(delay, callback) {
    if (delay) {
      setTimeout(() => {
        callback()
      }, delay)
    } else {
      callback()
    }
  }
  // 移除监听
  _remove(_bindListen) {
    window.removeEventListener('scroll', _bindListen)
  }
  // 距离视野符合要求
  _isInView(el, offset) {
		const rect = el.getBoundingClientRect()
		return (
      (rect.top >= 0 && rect.left >= 0 && rect.top) 
      <= 
      (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset)
    )
  }
  // 获取视野宽高
  _getViewportSize(el) {
    el = el || window
    // 除了IE8以及更早版本外，其它浏览器都能用
    if (el.innerWidth != null){ 
      return { 
        width: el.innerWidth,
        height: el.innerHeight 
      }
    }

    // 对标准模式下的IE或任何浏览器
    const doc = el.document
    if (document.compatMode == "CSS1Compat") {
      return { 
        width: doc.documentElement.clientWidth, 
        height: doc.documentElement.clientHeight
      }
    }
   
    // 对怪异模式下的浏览器
    return { 
      width: doc.body.clientWidth,
      height: doc.body.clientHeight
    }
  }
}