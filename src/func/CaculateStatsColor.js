export const caculateStatsColor = (base_stat) => {
    let color
    if (0 < base_stat && base_stat <= 20) {
        return color = '#3AAAD6'
    } else if (base_stat <= 40) {
        return color = '#ADD45C'
    } else if (base_stat <= 60) {
        return color = '#FFC300'
    } else if (base_stat <= 80) {
        return color = '#FF5733'
    } else if (base_stat <= 100) {
        return color = '#C70039'
    } else {
        return color = '#A21849'
    }
}