// Dữ liệu xe và câu hỏi trắc nghiệm
// Giá: triệu đồng, giá bán lẻ đề xuất tháng 11/2026 (tham khảo)
const BIKES = [
  {
    "id": "wave-alpha",
    "ten": "Honda Wave Alpha 110",
    "loai": "so",
    "giaMin": 17.96,
    "giaMax": 19.04,
    "bang": "A1",
    "tk": 5,
    "ben": 5,
    "dep": 1,
    "manh": 1,
    "cop": 1,
    "gon": 5,
    "to": 1,
    "tomtat": "Xe số giá rẻ, bền và rất tiết kiệm xăng, hợp với sinh viên cần một chiếc xe đi lại đơn giản.",
    "img": "images/wave-alpha.jpg"
  },
  {
    "id": "blade",
    "ten": "Honda Blade 110",
    "loai": "so",
    "giaMin": 18.9,
    "giaMax": 21.94,
    "bang": "A1",
    "tk": 5,
    "ben": 5,
    "dep": 2,
    "manh": 1,
    "cop": 1,
    "gon": 5,
    "to": 1,
    "tomtat": "Xe số giá thấp, dáng gọn và trẻ hơn Wave Alpha, có thêm bản thể thao cho người thích ngoại hình.",
    "img": "images/blade.jpg"
  },
  {
    "id": "future-125",
    "ten": "Honda Future 125 Fi",
    "loai": "so",
    "giaMin": 30.62,
    "giaMax": 32.29,
    "bang": "A1",
    "tk": 4,
    "ben": 5,
    "dep": 3,
    "manh": 3,
    "cop": 2,
    "gon": 3,
    "to": 2,
    "tomtat": "Xe số máy 125 cc phun xăng điện tử, khỏe và bền hơn các xe số 110 cc, đi xa tốt.",
    "img": "images/future-125.jpg"
  },
  {
    "id": "vision",
    "ten": "Honda Vision",
    "loai": "ga",
    "giaMin": 31.51,
    "giaMax": 36.81,
    "bang": "A1",
    "tk": 5,
    "ben": 4,
    "dep": 3,
    "manh": 2,
    "cop": 3,
    "gon": 5,
    "to": 2,
    "tomtat": "Xe ga nhẹ, dễ lái, tiết kiệm xăng và giá dễ chịu, là lựa chọn quen thuộc của sinh viên.",
    "img": "images/vision.jpg"
  },
  {
    "id": "lead-125",
    "ten": "Honda LEAD 125",
    "loai": "ga",
    "giaMin": 39.75,
    "giaMax": 45.84,
    "bang": "A1",
    "tk": 4,
    "ben": 4,
    "dep": 3,
    "manh": 2,
    "cop": 5,
    "gon": 3,
    "to": 3,
    "tomtat": "Xe ga có cốp rất rộng và yên thấp, ngồi thoải mái, hợp người hay mang laptop, đồ dùng.",
    "img": "images/lead-125.jpg"
  },
  {
    "id": "air-blade-125",
    "ten": "Honda Air Blade 125",
    "loai": "ga",
    "giaMin": 42.4,
    "giaMax": 48.0,
    "bang": "A1",
    "tk": 4,
    "ben": 4,
    "dep": 4,
    "manh": 3,
    "cop": 3,
    "gon": 3,
    "to": 3,
    "tomtat": "Xe ga dáng thể thao, máy 125 cc khỏe hơn Vision, hợp người thích xe đẹp nhưng vẫn dùng hằng ngày.",
    "img": "images/air-blade-125.jpg"
  },
  {
    "id": "air-blade-160",
    "ten": "Honda Air Blade 160",
    "loai": "ga",
    "giaMin": 57.09,
    "giaMax": 58.79,
    "bang": "A",
    "tk": 3,
    "ben": 4,
    "dep": 4,
    "manh": 4,
    "cop": 3,
    "gon": 2,
    "to": 4,
    "tomtat": "Xe ga máy 160 cc mạnh nhất trong nhóm xe ga phổ thông của Honda, đi xa và chở hai người đều tốt.",
    "img": "images/air-blade-160.jpg"
  },
  {
    "id": "sh-mode",
    "ten": "Honda SH Mode 125",
    "loai": "ga",
    "giaMin": 59.68,
    "giaMax": 66.36,
    "bang": "A1",
    "tk": 4,
    "ben": 4,
    "dep": 5,
    "manh": 3,
    "cop": 2,
    "gon": 3,
    "to": 3,
    "tomtat": "Xe ga cao cấp dáng sang, hoàn thiện tốt, mức giá cao nhất trong các mẫu 125 cc dành cho đi học, đi làm.",
    "img": "images/sh-mode.jpg"
  },
  {
    "id": "winner-r",
    "ten": "Honda Winner R",
    "loai": "con",
    "giaMin": 46.36,
    "giaMax": 50.76,
    "bang": "A",
    "tk": 2,
    "ben": 3,
    "dep": 5,
    "manh": 5,
    "cop": 1,
    "gon": 1,
    "to": 5,
    "tomtat": "Xe côn tay thể thao 150 cc, dáng đẹp, chạy mạnh, dành cho người thích cảm giác lái.",
    "img": "images/winner-r.jpg"
  }
];

const LOAI = {"ga": "Xe ga", "so": "Xe số", "con": "Xe côn tay"};

const ATTR_LABEL = {"tk": "tiết kiệm xăng", "ben": "bền, ít hỏng vặt", "dep": "kiểu dáng đẹp", "manh": "chạy mạnh, đi xa tốt", "cop": "cốp rộng, chở đồ", "gon": "gọn nhẹ, dễ lái", "to": "dáng lớn, hợp người cao"};

const QUESTIONS = [
  {
    "q": "Ngân sách mua xe của bạn?",
    "opts": [
      {
        "t": "Dưới 20 triệu",
        "cap": 20
      },
      {
        "t": "20 – 35 triệu",
        "cap": 35
      },
      {
        "t": "35 – 60 triệu",
        "cap": 60
      },
      {
        "t": "Trên 60 triệu",
        "cap": 70
      }
    ]
  },
  {
    "q": "Mỗi ngày bạn di chuyển khoảng bao xa?",
    "opts": [
      {
        "t": "Dưới 5 km",
        "w": {
          "gon": 1,
          "tk": 0.5
        }
      },
      {
        "t": "5 – 10 km",
        "w": {
          "tk": 1
        }
      },
      {
        "t": "10 – 20 km",
        "w": {
          "tk": 1,
          "manh": 1
        }
      },
      {
        "t": "Trên 20 km",
        "w": {
          "tk": 1,
          "manh": 2,
          "ben": 1
        }
      }
    ]
  },
  {
    "q": "Bạn dùng xe chủ yếu để làm gì?",
    "opts": [
      {
        "t": "Đi học",
        "w": {
          "gon": 1,
          "tk": 1,
          "ben": 1
        }
      },
      {
        "t": "Đi làm thêm / chạy app",
        "w": {
          "tk": 2,
          "ben": 2,
          "cop": 1
        }
      },
      {
        "t": "Đi chơi",
        "w": {
          "dep": 2
        }
      },
      {
        "t": "Đi phượt cuối tuần",
        "w": {
          "manh": 2.5,
          "ben": 1
        }
      }
    ]
  },
  {
    "q": "Bạn đang sống ở đâu?",
    "opts": [
      {
        "t": "Ở nhà"
      },
      {
        "t": "Trọ gần trường",
        "w": {
          "gon": 1
        }
      },
      {
        "t": "Ký túc xá",
        "w": {
          "gon": 1.5
        }
      },
      {
        "t": "Trọ xa trường",
        "w": {
          "tk": 1,
          "manh": 1
        }
      }
    ]
  },
  {
    "q": "Chiều cao của bạn?",
    "opts": [
      {
        "t": "Dưới 1m60",
        "w": {
          "gon": 1.5,
          "to": -1.5
        }
      },
      {
        "t": "1m60 – 1m68"
      },
      {
        "t": "1m68 – 1m75",
        "w": {
          "to": 0.5
        }
      },
      {
        "t": "Trên 1m75",
        "w": {
          "to": 1.5,
          "gon": -0.5
        }
      }
    ]
  },
  {
    "q": "Bạn thích kiểu xe nào?",
    "opts": [
      {
        "t": "Xe ga",
        "loai": "ga"
      },
      {
        "t": "Xe số",
        "loai": "so"
      },
      {
        "t": "Côn tay",
        "loai": "con"
      },
      {
        "t": "Chưa biết"
      }
    ]
  },
  {
    "q": "Bạn quan tâm điều gì nhất ở chiếc xe?",
    "opts": [
      {
        "t": "Tiết kiệm xăng",
        "w": {
          "tk": 2.5
        }
      },
      {
        "t": "Bền, ít hỏng vặt",
        "w": {
          "ben": 2.5
        }
      },
      {
        "t": "Kiểu dáng đẹp",
        "w": {
          "dep": 2.5
        }
      },
      {
        "t": "Chạy mạnh, êm",
        "w": {
          "manh": 2.5
        }
      }
    ]
  },
  {
    "q": "Bạn hay đi trên loại đường nào?",
    "opts": [
      {
        "t": "Nội thành đông xe",
        "w": {
          "gon": 1.5,
          "tk": 0.5
        }
      },
      {
        "t": "Hẻm nhỏ",
        "w": {
          "gon": 2
        }
      },
      {
        "t": "Đường dài, quốc lộ",
        "w": {
          "manh": 2
        }
      },
      {
        "t": "Đủ loại",
        "w": {
          "ben": 1,
          "manh": 0.5
        }
      }
    ]
  },
  {
    "q": "Bạn thường chở theo gì?",
    "opts": [
      {
        "t": "Chỉ một mình",
        "w": {
          "gon": 1
        }
      },
      {
        "t": "Chở bạn / người yêu",
        "w": {
          "manh": 1
        }
      },
      {
        "t": "Laptop, đồ nhiều",
        "w": {
          "cop": 2.5
        }
      },
      {
        "t": "Hàng hóa",
        "w": {
          "cop": 1.5,
          "ben": 1.5,
          "tk": 1
        }
      }
    ]
  },
  {
    "q": "Kinh nghiệm lái xe của bạn?",
    "opts": [
      {
        "t": "Mới tập lái",
        "w": {
          "gon": 2,
          "to": -1.5,
          "manh": -0.5
        }
      },
      {
        "t": "Lái dưới 1 năm",
        "w": {
          "gon": 1,
          "to": -0.5
        }
      },
      {
        "t": "Lái thành thạo"
      },
      {
        "t": "Đã có bằng hạng A",
        "w": {
          "manh": 1.5,
          "to": 1
        },
        "bangA": true
      }
    ]
  },
  {
    "q": "Chỗ để xe ở trường hoặc nhà trọ ra sao?",
    "opts": [
      {
        "t": "Hầm xe rộng",
        "w": {
          "to": 0.5
        }
      },
      {
        "t": "Gửi bãi bên ngoài",
        "w": {
          "ben": 1
        }
      },
      {
        "t": "Nhà trọ chật, phải dắt xe",
        "w": {
          "gon": 2
        }
      },
      {
        "t": "Để ngoài trời",
        "w": {
          "ben": 1.5
        }
      }
    ]
  },
  {
    "q": "Bạn chấp nhận chi bao nhiêu mỗi tháng cho xăng và bảo dưỡng?",
    "opts": [
      {
        "t": "Dưới 200 nghìn",
        "w": {
          "tk": 2.5
        }
      },
      {
        "t": "200 – 400 nghìn",
        "w": {
          "tk": 1
        }
      },
      {
        "t": "400 – 700 nghìn",
        "w": {
          "manh": 0.5
        }
      },
      {
        "t": "Không quan trọng",
        "w": {
          "manh": 1.5,
          "dep": 0.5
        }
      }
    ]
  }
];
