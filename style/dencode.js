function encode_data(datas) {
    d = 463
    p = 19
    q = 11
    n = p * q
    wn = (p - 1) * (q - 1)
    e = 7
    list_m_int = [5, 7, 17, 31, 57, 23, 19, 29, 41, 47, 63, 97, 61]
        // m= random.choice(list_m_int)    
    m = list_m_int[Math.floor(Math.random() * list_m_int.length)]
    c = Math.pow(m, e) % n
    kqmahoa = ''
    j = 1
    data = datas.toString()
    for (i in data) {
        j = j + 1
        somahoaascii = j * m - j + 3
        dauconghoactru = Math.pow(-1, j % 2 + 1)
        somahoaascii = somahoaascii % 15 + 1
        so_ascii_i = data[i].charCodeAt();
        kqmahoa += String.fromCharCode(so_ascii_i + dauconghoactru * somahoaascii)
    }
    kqmahoa = kqmahoa + "_æ_" + c + "_æ_" + n
    return kqmahoa
}

function decode_data(datas) {
    if(datas === undefined){
        return datas
    }
    else{
        data = datas.split("_æ_")
        c = Number(data[1])
        n = Number(data[2])
        d = 463
        kq_M_big = 1;
        for (i = 1; i <= d; i++) {
            kq_M_big = BigInt(kq_M_big) * BigInt(c)
        }
        kq_M_int = kq_M_big % BigInt(n)
        kq_M_string = kq_M_int.toString()
        kq_M = Number(kq_M_string)
        kqgiaima = ''
        j = 1
        data_string = data[0]
        for (i in data_string) {
            j = j + 1
            somahoaascii = j * kq_M - j + 3
            dauconghoactru = Math.pow(-1, j % 2 + 1)
            somahoaascii = somahoaascii % 15 + 1
                //kqgiaima = kqgiaima + chr(ord(i) - dauconghoactru * somahoaascii)
            so_ascii_i = data_string[i].charCodeAt();
            kq_mahoa_char = so_ascii_i - dauconghoactru * somahoaascii
                // kq_mahoa_char = kq_mahoa_char.toString()
            kqgiaima += String.fromCharCode(kq_mahoa_char)
        }
        return kqgiaima
    }
    


}
// string_data = "Chào hoàng đđđđĐĐĐĐĐỲÝỴỶỸƯỪỨỰỬỮÙÚỤỦŨìíịỉĩòóọỏõôồốộổỗơờớợởỡèéẹẻẽêềếệểễÀÁẠẢÃĂẰẮẶẲẴÂẦẤẬẨẪ]ÀÁẠẢÃĂẰẮẶẲẴÂẦẤẬẨẪ] ahihi đồ ngốk!!@@@"
// string_data = "ỶỸƯỪỨỰỬỮÙÚỤỦŨìíịỉĩòóọỏõôồốộổỗơờớợởỡèéẹẻẽ"
// string_data_encode = encode_data(string_data)
// string_data_decode = decode_data(string_data_encode)

// console.log(string_data)
// console.log(string_data_encode)
// console.log(string_data_decode)