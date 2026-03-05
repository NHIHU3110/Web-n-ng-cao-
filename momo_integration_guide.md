# Hướng dẫn tích hợp MoMo Payment vào Website (Node.js & Angular)

Bài tập này hướng dẫn cách tích hợp cổng thanh toán MoMo vào một ứng dụng web, tuân thủ theo quy trình 6 bước chuẩn: từ Backend (Node.js) đến Frontend (Angular).

---

## Bước 1 (Backend): Tạo API backend với các CRUD method

Tại bước này, Backend (Node.js/Express) đóng vai trò là cầu nối giữa ứng dụng của bạn và server của MoMo. Khi người dùng muốn thanh toán, Backend sẽ tạo một chữ ký điện tử (signature) để xác thực và gửi yêu cầu tạo giao dịch sang MoMo.

**Công việc cần làm trong Node.js:**
1. Đăng ký tài khoản dành cho lập trình viên tại [MoMo Developer](https://developers.momo.vn/).
2. Lấy các thông tin cấu hình (Credentials) cho môi trường Test (Sandbox):
    - `partnerCode`: Mã đối tác
    - `accessKey`: Khóa truy cập
    - `secretKey`: Khóa bí mật (Dùng để tạo chữ ký - KHÔNG ĐƯỢC ĐỂ LỘ Ở FRONTEND)
3. Cài đặt thư viện `crypto` để băm dữ liệu tạo chữ ký (HMAC SHA256).
4. Tạo một API POST (Ví dụ: `/api/momo/payment`):
   - Nhận thông tin đơn hàng từ Frontend (số tiền, mã đơn hàng...).
   - Gom các tham số lại và tạo ra một chữ ký (`signature`) theo định dạng mà MoMo yêu cầu.
   - Dùng `axios` hoặc `node-fetch` gọi POST request tới API khởi tạo thanh toán của MoMo: `https://test-payment.momo.vn/v2/gateway/api/create`.
   - Trả về cho Frontend cái `payUrl` (Đường link thanh toán chứa QR Code) mà MoMo phản hồi.

> [!IMPORTANT]
> **Bảo mật:** Toàn bộ công đoạn tạo chữ ký (tính toán `signature` với `secretKey`) bắt buộc phải thực hiện ở Backend. Tuyệt đối không đưa `secretKey` xuống Angular.

---

## Bước 2 (Backend): Test POSTMAN thành công

Trước khi đụng đến Frontend, bạn phải đảm bảo API ở Backend chạy hoàn hảo.

1. Bật Postman lên.
2. Tạo một request POST gửi đến `http://localhost:<cổng_backend>/api/momo/payment` (hoặc URL backend tương ứng).
3. Trong phần Body (dạng JSON), truyền vào data ví dụ: `{"amount": 50000, "orderInfo": "Thanh toan giay the thao"}`.
4. Nhấn **Send**.
5. Kết quả mong đợi (Response): Backend sẽ trả về đoạn JSON do MoMo cấp, trong đó có một URL quan trọng nhất là `payUrl`. Copy thử URL này bỏ lên trình duyệt, nếu thấy hiện ra cổng thanh toán MoMo (có mã QR) thì bạn đã hoàn thành xuất sắc 50% khối lượng công việc!

---

## Bước 3 (Frontend): Tạo HTTP service để sử dụng các API backend

Chuyển sang ứng dụng Angular. Lúc này, Angular chỉ việc "nhắn" Node.js đi tạo giao dịch.

1. Khởi tạo một Service mới, ví dụ: `ng generate service services/payment`
2. Inject `HttpClient` vào constructor.
3. Viết hàm `createMoMoPayment(orderData: any)` để gửi HTTP POST request tới API `/api/momo/payment` mà bạn đã tạo ở Bước 1.

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  createMoMoPayment(orderData: any) {
    // Gọi đến proxy cấu hình sang backend, ví dụ: /api/momo/payment
    return this.http.post<any>('/api/momo/payment', orderData);
  }
}
```

---

## Bước 4 (Frontend): Tạo các component tương ứng với các CRUD

Tại đây, bạn tạo giao diện cho trang giỏ hàng hoặc trang Thanh toán (Checkout).

1. Tạo Component: `ng generate component checkout`.
2. Trong file HTML, thiết kế một nút (button): **Thanh toán qua MoMo**. Có thể chèn logo MoMo cho chuyên nghiệp.
3. Bắt sự kiện `(click)` vào nút đó, gọi hàm `onPayWithMoMo()` trong file TypeScript.

```typescript
export class CheckoutComponent {
  constructor(private paymentService: PaymentService) {}

  onPayWithMoMo() {
    const fakeOrder = { amount: 50000, orderInfo: "Thanh toán hoá đơn #123" };
    
    this.paymentService.createMoMoPayment(fakeOrder).subscribe({
        next: (response) => {
            if(response && response.payUrl) {
                // Điều hướng người dùng sang trang thanh toán của MoMo
                window.location.href = response.payUrl;
            }
        },
        error: (err) => console.error("Lỗi thanh toán MoMo:", err)
    });
  }
}
```

---

## Bước 5 (Frontend): Cấu hình các routing phù hợp theo nhu cầu

Cần khai báo Router để người dùng có thể truy cập được trang Checkout, và đặc biệt là cấu hình URL để MoMo trả người dùng về ứng dụng sau khi thanh toán xong.

1. Bật file `app-routing.module.ts`.
2. Khai báo route cho trang Thanh toán: `{ path: 'checkout', component: CheckoutComponent }`.
3. Tạo thêm một Component nhận kết quả trả về từ MoMo, ví dụ `MoMoReturnComponent`.
4. Khai báo route `{ path: 'momo-return', component: MoMoReturnComponent }`. 

*Lưu ý:* Khi khởi tạo giao dịch ở Backend (Bước 1), bạn phải truyền `redirectUrl` là `http://localhost:4200/momo-return` (hoặc domain thực tế) để MoMo biết đường dẫn trả khách về trang web của bạn.

---

## Bước 6 (Frontend): Sử dụng các routing đã cấu hình, có thể tái sử dụng

Sau khi thanh toán xong trên cổng MoMo, hệ thống của MoMo sẽ tự động *redirect* người dùng về link `http://localhost:4200/momo-return` kèm theo các Query Parameters (như mã phản hồi `resultCode`, mã đơn hàng `orderId`...).

Trong `MoMoReturnComponent`:
1. Bắt các Param trên URL bằng `ActivatedRoute`.
2. Kiểm tra `resultCode`. Nếu `resultCode == "0"`, thông báo "Thanh toán thành công" (Hiển thị tick xanh). Nếu khác "0", thông báo "Thanh toán thất bại" hoặc "Giao dịch bị huỷ" (Hiển thị icon lỗi đỏ).

```typescript
export class MoMoReturnComponent implements OnInit {
  statusMessage: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        if(params['resultCode'] === '0') {
           this.statusMessage = 'Giao dịch thành công!';
        } else {
           this.statusMessage = 'Giao dịch thất bại: ' + params['message'];
        }
    });
  }
}
```

> [!TIP]
> **Xử lý IPN (Webhooks):** Để đảm bảo tính chính xác 100% của đơn hàng (phòng khi người dùng tắt trình duyệt ngay sau khi thanh toán mà chưa kịp văng về trang Return), ở Backend (Bước 1), bạn cần code thêm chức năng nhận IPN. MoMo sẽ ngầm gửi một HTTP POST về server Node.js của bạn báo trạng thái giao dịch để bạn update Database độc lập với trạng thái rớt mạng ở Frontend.

---
**Tài liệu tham khảo chính:**
- [MoMo Payment Gateway (Developers Docs)](https://developers.momo.vn/v3/docs/payment/guides/home)
- [MoMo NodeJS Integration GitHub Repo](https://github.com/momo-wallet/)
