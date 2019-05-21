-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 21, 2019 lúc 04:16 AM
-- Phiên bản máy phục vụ: 10.1.26-MariaDB
-- Phiên bản PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `webnangcao`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cap`
--

CREATE TABLE `cap` (
  `Q_ID` smallint(6) NOT NULL,
  `NQ_ID` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `cap`
--

INSERT INTO `cap` (`Q_ID`, `NQ_ID`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(3, 2),
(4, 1),
(4, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dangky`
--

CREATE TABLE `dangky` (
  `DK_ID` smallint(6) NOT NULL,
  `KH_ID` smallint(6) NOT NULL,
  `TK_ID` smallint(6) NOT NULL,
  `DK_NGAYDANGKY` date DEFAULT NULL,
  `DK_GIODANGKY` time DEFAULT NULL,
  `DK_DAPHANLOP` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `dangky`
--

INSERT INTO `dangky` (`DK_ID`, `KH_ID`, `TK_ID`, `DK_NGAYDANGKY`, `DK_GIODANGKY`, `DK_DAPHANLOP`) VALUES
(1, 3, 1, '2019-05-08', '05:00:00', 2),
(4, 8, 1, '2019-05-17', '09:54:03', 1),
(20, 7, 22, '2019-05-17', '23:27:18', 1),
(21, 0, 1, '2019-05-20', '18:38:45', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diem`
--

CREATE TABLE `diem` (
  `D_ID` smallint(6) NOT NULL,
  `MH_ID` smallint(6) NOT NULL,
  `TK_ID` smallint(6) NOT NULL,
  `D_DIEM` int(11) DEFAULT NULL,
  `D_KETQUA` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `diem`
--

INSERT INTO `diem` (`D_ID`, `MH_ID`, `TK_ID`, `D_DIEM`, `D_KETQUA`) VALUES
(1, 4, 1, 9, 'Gioi'),
(2, 3, 1, 10, 'Gioi'),
(5, 1, 1, 5, 'Yếu');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hocphi`
--

CREATE TABLE `hocphi` (
  `TK_ID` smallint(6) NOT NULL,
  `DK_ID` smallint(6) NOT NULL,
  `HP_ID` smallint(6) NOT NULL,
  `HP_CONNO` double DEFAULT NULL,
  `HP_NGAYDONG` date DEFAULT NULL,
  `HP_SOTIEN` double DEFAULT NULL,
  `HP_TINHTRANG` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `hocphi`
--

INSERT INTO `hocphi` (`TK_ID`, `DK_ID`, `HP_ID`, `HP_CONNO`, `HP_NGAYDONG`, `HP_SOTIEN`, `HP_TINHTRANG`) VALUES
(1, 1, 1, 2000000, NULL, 2000000, 0),
(1, 4, 3, 1000000, '0000-00-00', 1000000, 0),
(22, 20, 16, 1000000, '0000-00-00', 1000000, 0),
(1, 21, 17, 3000000, '0000-00-00', 3000000, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khoahoc`
--

CREATE TABLE `khoahoc` (
  `KH_ID` smallint(6) NOT NULL,
  `MH_ID` smallint(6) NOT NULL,
  `KH_TEN` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `KH_BATDAU` date DEFAULT NULL,
  `KH_KETTHUC` date DEFAULT NULL,
  `KH_HOCPHI` double DEFAULT NULL,
  `KH_NAMHOC` varchar(10) DEFAULT NULL,
  `KH_GIAOVIEN` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `khoahoc`
--

INSERT INTO `khoahoc` (`KH_ID`, `MH_ID`, `KH_TEN`, `KH_BATDAU`, `KH_KETTHUC`, `KH_HOCPHI`, `KH_NAMHOC`, `KH_GIAOVIEN`) VALUES
(0, 6, 'Bảo trì máy tính', '2019-04-30', '2019-05-30', 3000000, '2019', 'Cô Thuý'),
(1, 1, 'Winform C#', '2019-05-17', '2019-05-16', 1000000, '2018', 'Cô Ngọc'),
(2, 2, 'Wordpress', '2019-05-20', '2019-05-31', 1500000, '2019', 'Cô Uyên'),
(3, 3, 'Linux', '2019-05-01', '2019-05-24', 2000000, '2019', 'Cô Lương'),
(4, 4, 'Thiết kế LAN', '2019-06-05', '2019-06-21', 1000000, '2019', 'Thầy Công'),
(5, 5, 'Photoshop', '2019-05-08', '2019-05-09', 2500000, '2019', 'Thầy Hiệp'),
(6, 6, 'Sửa phần cứng', '2019-05-01', '2019-05-31', 3000000, '2019', 'Cô Thi'),
(7, 2, 'PHP', '2019-05-20', '2019-05-16', 1000000, '2019', 'Thầy Thắng'),
(8, 3, 'Ubuntu', '2019-05-20', '2019-05-31', 1000000, '2019', 'Cô Trang'),
(12, 7, 'QT CNTT', '2019-05-15', '2019-07-25', 3500000, '2019', 'Thầy Quý');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaitintuc`
--

CREATE TABLE `loaitintuc` (
  `LT_ID` smallint(6) NOT NULL,
  `LT_TEN` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `LT_MOTA` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `loaitintuc`
--

INSERT INTO `loaitintuc` (`LT_ID`, `LT_TEN`, `LT_MOTA`) VALUES
(1, 'Tin trong ngành', 'Kỳ thi,hoạt động tổ chức trong ngành'),
(2, 'Tin nội bộ', 'Tuyển sinh,điểm đầu vào'),
(3, 'Hoạt động phong trào', 'Câu lạc bộ,hội trại,sinh viên tình nguyện');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lop`
--

CREATE TABLE `lop` (
  `LP_ID` smallint(6) NOT NULL,
  `KH_ID` smallint(6) NOT NULL,
  `LP_SISO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `lop`
--

INSERT INTO `lop` (`LP_ID`, `KH_ID`, `LP_SISO`) VALUES
(0, 0, 50),
(1, 1, 50),
(2, 2, 10),
(3, 3, 30),
(4, 4, 40),
(6, 7, 60),
(8, 8, 20),
(10, 0, 100);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `monhoc`
--

CREATE TABLE `monhoc` (
  `MH_ID` smallint(6) NOT NULL,
  `MH_TEN` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MH_NOIDUNG` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `MH_THOILUONG` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `monhoc`
--

INSERT INTO `monhoc` (`MH_ID`, `MH_TEN`, `MH_NOIDUNG`, `MH_THOILUONG`) VALUES
(1, 'Phát triển phần mềm', 'Phát triển phần mềm,web', 60),
(2, 'Thiết kế web', 'Thiết kế giao diện web', 50),
(3, 'Mã nguồn mở', 'Khái niệm bản quyền', 70),
(4, 'Mạng', 'Thiết kế mô hình mạng,cấu hình thiết bị', 70),
(5, 'Đồ hoạ', 'Photoshop, AI, Lightroom', 80),
(6, 'Bảo trì máy tính', 'Phần cứng, phần mềm và cách sửa lỗ', 80),
(7, 'Quản trị dự án', 'Quản trị dự án', 60);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

CREATE TABLE `nguoidung` (
  `ND_ID` smallint(6) NOT NULL,
  `TK_ID` smallint(6) NOT NULL,
  `ND_HO` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ND_TEN` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ND_NGAYSINH` date DEFAULT NULL,
  `ND_DIACHI` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ND_HOCVAN` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `nguoidung`
--

INSERT INTO `nguoidung` (`ND_ID`, `TK_ID`, `ND_HO`, `ND_TEN`, `ND_NGAYSINH`, `ND_DIACHI`, `ND_HOCVAN`) VALUES
(1, 1, 'Đàm', 'Đức Duy', '1997-07-29', '11/3khe sanh p10', 'Đại học'),
(14, 22, 'Xuan', 'Manh', '2019-05-22', '11 3 Khe Sanh,Phuong 10,Da Lat,Lam Dong', 'Đại học'),
(15, 23, 'Lê', 'Gia Công', '0000-00-00', '11 3 Khe Sanh,Phuong 10,Da Lat,Lam Dong', 'Giáo viên');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhomquyen`
--

CREATE TABLE `nhomquyen` (
  `NQ_ID` smallint(6) NOT NULL,
  `NQ_TEN` varchar(50) DEFAULT NULL,
  `NQ_MOTA` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `nhomquyen`
--

INSERT INTO `nhomquyen` (`NQ_ID`, `NQ_TEN`, `NQ_MOTA`) VALUES
(1, 'Admin', 'Ban giám đốc'),
(2, 'Manager', 'Quản trị website'),
(3, 'Teacher', 'Giáo viên'),
(4, 'Reception', 'Tiếp tân'),
(5, 'Student', 'Học viên'),
(6, 'Parent', 'Phụ huynh'),
(7, 'Customer', 'Khách');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quyen`
--

CREATE TABLE `quyen` (
  `Q_ID` smallint(6) NOT NULL,
  `Q_MOTA` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `Q_GHICHU` text CHARACTER SET utf8 COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `quyen`
--

INSERT INTO `quyen` (`Q_ID`, `Q_MOTA`, `Q_GHICHU`) VALUES
(1, 'them', 'Thêm thông tin'),
(2, 'xoa', 'Xoá thông tin'),
(3, 'sua', 'Sửa thông tin'),
(4, 'Xem', 'Xem thông tin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `TK_ID` smallint(6) NOT NULL,
  `NQ_ID` smallint(6) NOT NULL,
  `TK_USERNAME` varchar(20) DEFAULT NULL,
  `TK_PASSWORD` varchar(20) DEFAULT NULL,
  `TK_MAIL` varchar(50) DEFAULT NULL,
  `TK_PHONE` varchar(11) DEFAULT NULL,
  `TK_LOAI` int(11) DEFAULT NULL,
  `TK_NGAYDK` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`TK_ID`, `NQ_ID`, `TK_USERNAME`, `TK_PASSWORD`, `TK_MAIL`, `TK_PHONE`, `TK_LOAI`, `TK_NGAYDK`) VALUES
(1, 1, 'dandutday', '2810', 'dan.dut.day@gmail.com', '0379286232', 5, '1997-07-28'),
(22, 1, 'Manh', '2810', 'trinhxuanmanh6@gmail.com', '+8437928623', 1, '2019-05-17'),
(23, 1, 'Cong', '2810', 'legiacong@gmail.com', '+8437928623', 1, '2019-05-20');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thoikhoabieu`
--

CREATE TABLE `thoikhoabieu` (
  `TKB_ID` smallint(6) NOT NULL,
  `LP_ID` smallint(6) NOT NULL,
  `TKB_BUOI` varchar(10) DEFAULT NULL,
  `TKB_NGAY` date DEFAULT NULL,
  `TKB_GIOBATDAU` time DEFAULT NULL,
  `TKB_GIOKETTHUC` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `thoikhoabieu`
--

INSERT INTO `thoikhoabieu` (`TKB_ID`, `LP_ID`, `TKB_BUOI`, `TKB_NGAY`, `TKB_GIOBATDAU`, `TKB_GIOKETTHUC`) VALUES
(1, 2, 'Sáng', '2019-05-07', '08:00:00', '11:00:00'),
(2, 6, 'Sáng', '2019-05-23', '07:00:00', '09:00:00'),
(4, 0, 'Sáng', '2019-05-22', '09:00:00', '11:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tintuc`
--

CREATE TABLE `tintuc` (
  `TT_ID` smallint(6) NOT NULL,
  `LT_ID` smallint(6) NOT NULL,
  `TK_ID` smallint(6) NOT NULL,
  `TT_TIEUDE` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `TT_NOIDUNG` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `TT_NGAY` date NOT NULL,
  `TT_GHICHU` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `tintuc`
--

INSERT INTO `tintuc` (`TT_ID`, `LT_ID`, `TK_ID`, `TT_TIEUDE`, `TT_NOIDUNG`, `TT_NGAY`, `TT_GHICHU`) VALUES
(2, 2, 23, 'Cách tạo ra một trang web trong vòng 5 phút?', 'Trước hết, chúng ta hãy làm rõ ngay từ đầu: mặc dù hướng dẫn này hoàn toàn miễn phí (chà!), nhưng nó không nói về việc tạo trang web miễn phí. Quả thật, về kỹ thuật mà nói, có thể tạo một trang web mà không tốn đồng nào, nhưng khi đó bạn sẽ cần sử dụng hosting miễn phí (điều không thoải mái cho lắm) hoặc một subscription plan không tính phí với nhà tạo trang web như Weebly (hiển thị quảng cáo và thương hiệu của họ trên trang web của bạn, e hèm). Tuy nhiên, lý do lớn nhất là bạn không thể có tên domain miễn phí trong trường hợp đó, và “đu” theo domain của ai đó, chẳng hạn như “mysite.weebly.com” thì khách truy cập của bạn lại không coi trọng cho lắm.', '2019-05-21', NULL),
(3, 2, 23, '5 Cách kiếm tiền tại nhà', 'Kiếm tiền online (Make Money Online) hay còn goi là MMO trở thành một xu hướng tạo ra nguồn thu nhập cực phổ biến hiện nay. Có thể bạn chẳng thấy \"thằng hàng xóm\" hay \"đứa bàn bên\" không đi làm nhưng tụi nó vẫn có tiền tiêu xài. Nhưng bạn không thể biết những người đó làm gì trên mạng? Công nghệ phát triển thì càng có nhiều hình thức kiếm tiền online xuất hiện. Tính chất tự do, thoải mái, nhiều cơ hội & đầy tiềm năng đã khiến nhiều người đã xem MMO trở thành một công việc chính của họ. Rất nhiều cá nhân tạo được dòng thu nhập đều đặn, bền vững, với mức thu nhập \"khủng\" nhờ MMO. \"Khủng\" ở đây là như nào ? Là $1000, $2000 hoặc thậm chí hơn mỗi tháng.', '2019-05-22', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cap`
--
ALTER TABLE `cap`
  ADD PRIMARY KEY (`Q_ID`,`NQ_ID`),
  ADD KEY `FK_CAP2` (`NQ_ID`);

--
-- Chỉ mục cho bảng `dangky`
--
ALTER TABLE `dangky`
  ADD PRIMARY KEY (`DK_ID`),
  ADD KEY `FK_CHO1` (`TK_ID`),
  ADD KEY `FK_CHO2` (`KH_ID`);

--
-- Chỉ mục cho bảng `diem`
--
ALTER TABLE `diem`
  ADD PRIMARY KEY (`D_ID`),
  ADD KEY `FK_CO1` (`TK_ID`),
  ADD KEY `FK_CO2` (`MH_ID`);

--
-- Chỉ mục cho bảng `hocphi`
--
ALTER TABLE `hocphi`
  ADD PRIMARY KEY (`HP_ID`),
  ADD KEY `FK_CUA1` (`TK_ID`),
  ADD KEY `FK_CUA3` (`DK_ID`);

--
-- Chỉ mục cho bảng `khoahoc`
--
ALTER TABLE `khoahoc`
  ADD PRIMARY KEY (`KH_ID`),
  ADD KEY `FK_THUOCVE` (`MH_ID`);

--
-- Chỉ mục cho bảng `loaitintuc`
--
ALTER TABLE `loaitintuc`
  ADD PRIMARY KEY (`LT_ID`);

--
-- Chỉ mục cho bảng `lop`
--
ALTER TABLE `lop`
  ADD PRIMARY KEY (`LP_ID`),
  ADD KEY `FK_PHANCHO` (`KH_ID`);

--
-- Chỉ mục cho bảng `monhoc`
--
ALTER TABLE `monhoc`
  ADD PRIMARY KEY (`MH_ID`);

--
-- Chỉ mục cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`ND_ID`),
  ADD KEY `FK_CUNGCAP` (`TK_ID`);

--
-- Chỉ mục cho bảng `nhomquyen`
--
ALTER TABLE `nhomquyen`
  ADD PRIMARY KEY (`NQ_ID`);

--
-- Chỉ mục cho bảng `quyen`
--
ALTER TABLE `quyen`
  ADD PRIMARY KEY (`Q_ID`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`TK_ID`),
  ADD KEY `FK_THUOC` (`NQ_ID`);

--
-- Chỉ mục cho bảng `thoikhoabieu`
--
ALTER TABLE `thoikhoabieu`
  ADD PRIMARY KEY (`TKB_ID`),
  ADD KEY `FK_XEP` (`LP_ID`);

--
-- Chỉ mục cho bảng `tintuc`
--
ALTER TABLE `tintuc`
  ADD PRIMARY KEY (`TT_ID`),
  ADD KEY `FK_DANG` (`TK_ID`),
  ADD KEY `FK_GOM` (`LT_ID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `dangky`
--
ALTER TABLE `dangky`
  MODIFY `DK_ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `diem`
--
ALTER TABLE `diem`
  MODIFY `D_ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `hocphi`
--
ALTER TABLE `hocphi`
  MODIFY `HP_ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `khoahoc`
--
ALTER TABLE `khoahoc`
  MODIFY `KH_ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `loaitintuc`
--
ALTER TABLE `loaitintuc`
  MODIFY `LT_ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `lop`
--
ALTER TABLE `lop`
  MODIFY `LP_ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `monhoc`
--
ALTER TABLE `monhoc`
  MODIFY `MH_ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  MODIFY `ND_ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `nhomquyen`
--
ALTER TABLE `nhomquyen`
  MODIFY `NQ_ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `quyen`
--
ALTER TABLE `quyen`
  MODIFY `Q_ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `TK_ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `thoikhoabieu`
--
ALTER TABLE `thoikhoabieu`
  MODIFY `TKB_ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `tintuc`
--
ALTER TABLE `tintuc`
  MODIFY `TT_ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cap`
--
ALTER TABLE `cap`
  ADD CONSTRAINT `FK_CAP` FOREIGN KEY (`Q_ID`) REFERENCES `quyen` (`Q_ID`),
  ADD CONSTRAINT `FK_CAP2` FOREIGN KEY (`NQ_ID`) REFERENCES `nhomquyen` (`NQ_ID`);

--
-- Các ràng buộc cho bảng `dangky`
--
ALTER TABLE `dangky`
  ADD CONSTRAINT `FK_CHO1` FOREIGN KEY (`TK_ID`) REFERENCES `taikhoan` (`TK_ID`),
  ADD CONSTRAINT `FK_CHO2` FOREIGN KEY (`KH_ID`) REFERENCES `khoahoc` (`KH_ID`);

--
-- Các ràng buộc cho bảng `diem`
--
ALTER TABLE `diem`
  ADD CONSTRAINT `FK_CO1` FOREIGN KEY (`TK_ID`) REFERENCES `taikhoan` (`TK_ID`),
  ADD CONSTRAINT `FK_CO2` FOREIGN KEY (`MH_ID`) REFERENCES `monhoc` (`MH_ID`);

--
-- Các ràng buộc cho bảng `hocphi`
--
ALTER TABLE `hocphi`
  ADD CONSTRAINT `FK_CUA1` FOREIGN KEY (`TK_ID`) REFERENCES `taikhoan` (`TK_ID`),
  ADD CONSTRAINT `FK_CUA3` FOREIGN KEY (`DK_ID`) REFERENCES `dangky` (`DK_ID`);

--
-- Các ràng buộc cho bảng `khoahoc`
--
ALTER TABLE `khoahoc`
  ADD CONSTRAINT `FK_THUOCVE` FOREIGN KEY (`MH_ID`) REFERENCES `monhoc` (`MH_ID`);

--
-- Các ràng buộc cho bảng `lop`
--
ALTER TABLE `lop`
  ADD CONSTRAINT `FK_PHANCHO` FOREIGN KEY (`KH_ID`) REFERENCES `khoahoc` (`KH_ID`);

--
-- Các ràng buộc cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD CONSTRAINT `FK_CUNGCAP` FOREIGN KEY (`TK_ID`) REFERENCES `taikhoan` (`TK_ID`);

--
-- Các ràng buộc cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `FK_THUOC` FOREIGN KEY (`NQ_ID`) REFERENCES `nhomquyen` (`NQ_ID`);

--
-- Các ràng buộc cho bảng `thoikhoabieu`
--
ALTER TABLE `thoikhoabieu`
  ADD CONSTRAINT `FK_XEP` FOREIGN KEY (`LP_ID`) REFERENCES `lop` (`LP_ID`);

--
-- Các ràng buộc cho bảng `tintuc`
--
ALTER TABLE `tintuc`
  ADD CONSTRAINT `FK_DANG` FOREIGN KEY (`TK_ID`) REFERENCES `taikhoan` (`TK_ID`),
  ADD CONSTRAINT `FK_GOM` FOREIGN KEY (`LT_ID`) REFERENCES `loaitintuc` (`LT_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
