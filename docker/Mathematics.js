class Mathematics {
    constructor() {
        this.PHI = 3.14159;
    }

    suma(...nums) {
        let suma = 0;
        for (let i = 0; i < nums.length; i++) {
            suma += nums[i];
        }

        return suma;
    }

    resta(...nums) {
        let resta = 0;
        if(nums.length > 0) {
            resta = nums[0];
        }

        for (let i = 1; i < nums.length; i++) {
            resta -= nums[i];
        }

        return resta;
    }
}

module.exports = Mathematics;