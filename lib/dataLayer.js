module.exports = class dataLayer {
    constructor(options, initialData) {
        this.data = initialData || {};
    }

    set(data) {
        this.data = data;
    }

    get() {
        return this.data;
    }

}
