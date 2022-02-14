/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI:
      "mongodb+srv://Mohamed_Safwan:zmn7tjLZGRXPtRa@cluster0.kiwnv.mongodb.net/cloud_storage?retryWrites=true&w=majority",
    JWT_SECRET: `
    MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxGGQkv776eM7q
    IgGhGnWwH5urJfZy9mgdwPpFVv2PqEE4ZBvPTixa0q0Yc4qZo/YwcuVVYzmcZltk
    ZnJNWQKhZith7up1aYfpuYqgeh+3JHYJ8SjbpN2t8jj//fXHjeViaI5gdhYB4JV1
    L4Xe13oMjj3m77K1T0ceEG6UJCOhggjF1+wv+HCY4QgRiV1rHyrthBsKfKJTLVd4
    XeHHE16h4cIpFtI6vXUlg3NwlHhivZD1ti/5OESlucAn5FBnW4DpJSgywLQ1Gt5E
    lKG+OGjrpbDQl2K+jWE4AI3K3ApPLgB2HjxZQrAIMrbhUW/tF8q4F232vHdfum18
    0fY478ClAgMBAAECggEAAsYZh3PTZ3Pt9b/bm6zg7AXKt+cL0agnYFPt95kRtqbR
    grMatmgIjNGg8XGZ2ac2S3L5QZmgxODbjJqILsr2nhWOF2YZGQayoMgNsk7HYWR6
    TtSOqcYOzNMu7l+Jcns3/Q8bL8qZtKTSYngAlkl0uW6e7JeTioB34jIqsTpRro1m
    rfV0kmArRFWCg+F/ZffTKPzkkvIZMg2DcSDukuL1D+twyxp5lxSCYfvwioHwntHe
    SHg6eWTuimdN2F+Cm5sQcZxMCI9lM4/0NIguCx4qFIQri9BnQQhleeceTQrKY9vf
    R0/FmD/NuYiQer/dUZvBwW1IXZFW4zeu3J+MUXuOgQKBgQDdTGY8zw6/gbfVcon7
    ohB/Ub+X+j/D6srngKz/YBXyhWc3SIABgHjWoSbnl+HIYqKS9BQL7YnxkKv+lJss
    w7ROkcFl8MyDsJ4YHlp0C0UxoJed5A5ZF9lnWRy3gmPkNPclifE0x47R3v4TJ6Ju
    G14yz64uF7/nM0+wtCDXetyvZQKBgQDM3Yp96qQzZYaB9Gkty761YaVyhOjp14+U
    GATBB3cjUdkCMzIDVxw6I4RxTKtsWcOt/gOqr63XjMzaOIsboT2xHPjb2xkIwA2a
    gmfsSMhFdqLR9iZDBu405tjQIgpPFwgPX6GkriiW4C/F8Dbog0XI/flTHIj7RdZU
    dkpisaLYQQKBgQC2PzjjU1I9/MI8knt4M9uKPvSeYIUq/63iQWI3XhY1CBAcwyRI
    GFlryIOVrstOj4x7oW7w88rqmc5Ldm7kyrcvDXJMVabXvRg1nKm5b56oZCz45tu6
    G537MrQnnMZPJh9zVsrCQKYpyI9NjxKBwyAskERNyVlNOkCisXVqf9BG0QKBgAf7
    BV8cWeMqrE+5rrM7AaXdNO2+IbiiThSNzvmaCdkVYifEyMj6hr35Djq/qtngsU/A
    2nG2wEXqVTyXAUxFPrr8jvE5msMNgDoppFS/DRYvpe4Z8amgxnzHFWEeQlqMYiL/
    LbPVmP0vpIzIa8so+fn3ctP7A5cORGgr53/qvZZBAoGAUfTMSXbxDw6l/kbBEblX
    nkRnQNa/vRgBuLKwcDL+HbZUDadPgSdDQ18ghcyCS0xWc8W/U3sNnHhi2hBkDxoO
    xlNlf/CKkvIucS/v6mQMqtiK0jpS1l8pzv+yitxQvvpEtVWrUGIn0JTn72bt8CWW
    KfSJLfhKxLQAbqb0yQuy0N4=`,
  },
};

module.exports = nextConfig;
