// Nội dung bài viết blog
const blogPosts = {
    1: {
        title: "Tiêu Đề Bài Viết Blog 1",
        date: "20/06/2024",
        image: "img/blog-1.jpg",
        content: `
            <p>Nội dung chi tiết của bài viết blog 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum tortor sem. Nunc dapibus bibendum erat. Etiam vestibulum felis eget erat vestibulum interdum. Sed hendrerit orci vel diam venenatis, in iaculis elit feugiat. Nulla euismod efficitur nisl, ac facilisis turpis fringilla non. Donec vulputate orci at est interdum, nec lobortis ante sodales.</p>
            <p>Proin scelerisque, nisi nec malesuada suscipit, est ligula tincidunt nisl, et bibendum enim lorem et lectus. Curabitur maximus nisi sed leo bibendum, non pulvinar leo vulputate. Vestibulum sit amet mi dui. Nam pretium, arcu vitae hendrerit posuere, erat tortor auctor est, nec scelerisque ex turpis sit amet quam. Aenean facilisis mauris id felis pretium, at interdum mi commodo. Integer malesuada tincidunt nulla, a tempor enim sagittis a.</p>
        `
    },
    2: {
        title: "Tiêu Đề Bài Viết Blog 2",
        date: "21/06/2024",
        image: "img/blog-2.jpg",
        content: `
            <p>Nội dung chi tiết của bài viết blog 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum tortor sem. Nunc dapibus bibendum erat. Etiam vestibulum felis eget erat vestibulum interdum. Sed hendrerit orci vel diam venenatis, in iaculis elit feugiat. Nulla euismod efficitur nisl, ac facilisis turpis fringilla non. Donec vulputate orci at est interdum, nec lobortis ante sodales.</p>
            <p>Proin scelerisque, nisi nec malesuada suscipit, est ligula tincidunt nisl, et bibendum enim lorem et lectus. Curabitur maximus nisi sed leo bibendum, non pulvinar leo vulputate. Vestibulum sit amet mi dui. Nam pretium, arcu vitae hendrerit posuere, erat tortor auctor est, nec scelerisque ex turpis sit amet quam. Aenean facilisis mauris id felis pretium, at interdum mi commodo. Integer malesuada tincidunt nulla, a tempor enim sagittis a.</p>
        `
    }
};

// Xử lý sự kiện nút "Đọc Thêm"
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const postId = this.getAttribute('data-id');
            const post = blogPosts[postId];
            if (post) {
                document.getElementById('blog-detail-title').innerText = post.title;
                document.getElementById('blog-detail-date').innerText = post.date;
                document.getElementById('blog-detail-image').src = post.image;
                document.getElementById('blog-detail-image').alt = post.title;
                document.getElementById('blog-detail-content').innerHTML = post.content;
                document.getElementById('blog-content').classList.add('d-none');
                document.getElementById('blog-detail').classList.remove('d-none');
                window.scrollTo(0, 0); // Cuộn lên đầu trang
            }
        });
    });
});

// Quay lại danh sách bài viết
function goBack() {
    document.getElementById('blog-detail').classList.add('d-none');
    document.getElementById('blog-content').classList.remove('d-none');
}

// Giỏ hàng và các biến liên quan
let cartCount = 0;
let cart = {};

// Khởi tạo giỏ hàng từ localStorage nếu có
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo danh sách khóa học, số khóa học mỗi trang và trang hiện tại
    let courses = [];
    const coursesPerPage = 5;
    let currentPage = 1;

    // Lấy giỏ hàng từ localStorage nếu có
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
        updateCartDisplay();
    }

    // Lấy danh sách khóa học từ API
    fetchCourses();

    // Xử lý sự kiện chuyển trang
    document.getElementById('pagination').addEventListener('click', function(event) {
        if (event.target.classList.contains('page-link')) {
            event.preventDefault();
            const page = parseInt(event.target.getAttribute('data-page'));
            displayCourses(page);
        }
    });

    // Lấy danh sách khóa học từ API
    function fetchCourses() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                courses = data.map((post, index) => ({
                    id: post.id,
                    title: post.title,
                    description: post.body,
                    price: Math.floor(Math.random() * 1000000) + 100000,
                    image: `img/course-${(index % 6) + 1}.jpg`
                }));
                console.log('Fetched courses:', courses); // Kiểm tra dữ liệu từ API
                setupPagination();
                displayCourses(currentPage);
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách khóa học:', error);
            });
    }

    // Thiết lập phân trang
    function setupPagination() {
        const totalPages = Math.ceil(courses.length / coursesPerPage);
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
            pagination.appendChild(pageItem);
        }
    }

    // Hiển thị khóa học theo trang
    function displayCourses(page) {
        currentPage = page;
        const startIndex = (page - 1) * coursesPerPage;
        const endIndex = startIndex + coursesPerPage;
        const courseCategories = document.getElementById('courseCategories');
        courseCategories.innerHTML = '';

        const currentCourses = courses.slice(startIndex, endIndex);
        currentCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('col-md-4', 'mb-4');
            courseCard.innerHTML = `
                <div class="card h-100">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}">
                    <div class="card-body">
                        <h5 class="card-title">${course.title}</h5>
                        <p class="card-text">${course.description}</p>
                        <p class="card-text"><strong>${course.price} VND</strong></p>
                        <a href="#" class="btn btn-primary btn-course-detail" data-course-id="${course.id}">Xem Chi Tiết</a>
                        <a href="#" class="btn btn-primary btn-course-buy" data-product-id="${course.id}">Mua Ngay</a>
                    </div>
                </div>
            `;
            courseCategories.appendChild(courseCard);
        });

        // Gắn lại sự kiện click cho các nút "Xem Chi Tiết" và "Mua Ngay"
        attachCourseDetailEvents();
    }

    // Hàm gắn sự kiện click cho các nút "Xem Chi Tiết" và "Mua Ngay"
    function attachCourseDetailEvents() {
        document.querySelectorAll('.btn-course-detail').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const courseId = this.getAttribute('data-course-id');
                const course = courses.find(c => c.id == courseId);
                if (course) {
                    document.getElementById('courseDetailImage').src = course.image;
                    document.getElementById('courseDetailTitle').innerText = course.title;
                    document.getElementById('courseDetailDescription').innerText = course.description;
                    document.getElementById('courseDetailPrice').innerText = course.price + ' VND';
                    document.getElementById('courseDetailBuyNow').setAttribute('data-product-id', course.id);
                    var courseDetailModal = new bootstrap.Modal(document.getElementById('courseDetailModal'));
                    courseDetailModal.show();
                }
            });
        });

        document.querySelectorAll('.btn-course-buy').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const productId = this.getAttribute('data-product-id');
                addToCart(productId);
                alert('Đã thêm vào giỏ hàng');
                console.log('Product added to cart:', productId); // Kiểm tra sản phẩm được thêm vào giỏ hàng
            });
        });
    }

    // Xử lý sự kiện mua khóa học
    document.getElementById('courseDetailBuyNow').addEventListener('click', function(event) {
        const productId = this.getAttribute('data-product-id');
        addToCart(productId);
        alert('Đã thêm vào giỏ hàng');
        var courseDetailModal = bootstrap.Modal.getInstance(document.getElementById('courseDetailModal'));
        courseDetailModal.hide();
    });

    // Thêm khóa học vào giỏ hàng
    function addToCart(productId) {
        if (cart[productId]) {
            cart[productId]++;
        } else {
            cart[productId] = 1;
        }
        cartCount++;
        updateCartDisplay();
        updateCartModal();
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart updated:', cart); // Kiểm tra giỏ hàng sau khi cập nhật
    }

    // Cập nhật hiển thị số lượng sản phẩm trong giỏ hàng
    function updateCartDisplay() {
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            console.log('Cart count updated:', cartCount); // Kiểm tra số lượng giỏ hàng
        } else {
            console.error('Cart count element not found');
        }
    }

    // Cập nhật nội dung giỏ hàng
    function updateCartModal() {
        const cartDetails = document.getElementById('cartDetails');
        if (!cartDetails) {
            console.error('Cart details element not found');
            return;
        }

        cartDetails.innerHTML = '';

        let totalAmount = 0;
        for (const productId in cart) {
            const quantity = cart[productId];
            const product = getProductDetails(productId);
            if (!product) {
                console.error('Không tìm thấy sản phẩm với ID:', productId);
                continue;
            }
            const total = product.price * quantity;
            totalAmount += total;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>
                    <button class="btn btn-sm btn-secondary decrease-quantity" data-product-id="${productId}">-</button>
                    ${quantity}
                    <button class="btn btn-sm btn-secondary increase-quantity" data-product-id="${productId}">+</button>
                </td>
                <td>${product.price} VND</td>
                <td>${total} VND</td>
                <td>
                    <button class="btn btn-sm btn-danger delete-item" data-product-id="${productId}">Xóa</button>
                </td>
            `;
            cartDetails.appendChild(row);
        }
        document.getElementById('totalAmount').textContent = totalAmount;

        // Xử lý sự kiện tăng số lượng sản phẩm
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                cart[productId]++;
                cartCount++;
                updateCartDisplay();
                updateCartModal();
                localStorage.setItem('cart', JSON.stringify(cart));
            });
        });

        // Xử lý sự kiện giảm số lượng sản phẩm
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                if (cart[productId] > 1) {
                    cart[productId]--;
                    cartCount--;
                    updateCartDisplay();
                    updateCartModal();
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
            });
        });

        // Xử lý sự kiện xóa sản phẩm khỏi giỏ hàng
        document.querySelectorAll('.delete-item').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                cartCount -= cart[productId];
                delete cart[productId];
                updateCartDisplay();
                updateCartModal();
                localStorage.setItem('cart', JSON.stringify(cart));
            });
        });
    }

    // Lấy thông tin sản phẩm theo ID
    function getProductDetails(productId) {
        const products = {
            1: { name: 'Yoga Cho Người Mới Bắt Đầu', price: 500000 },
            2: { name: 'Yoga Trung Cấp', price: 700000 },
            3: { name: 'Yoga Nâng Cao', price: 900000 },
            4: { name: 'Yoga Thiền Định', price: 600000 },
            5: { name: 'Yoga Cho Trẻ Em', price: 400000 },
            6: { name: 'Yoga Trị Liệu', price: 800000 }
        };
        return products[productId] || null; // Trả về null nếu không tìm thấy sản phẩm
    }

    // Xử lý sự kiện khi mở modal giỏ hàng
    const cartModalElement = document.getElementById('cartModal');
    if (cartModalElement) {
        cartModalElement.addEventListener('show.bs.modal', function() {
            updateCartModal();
        });
    } else {
        console.error('Cart modal element not found');
    }

    // Xử lý sự kiện nút "Thanh Toán"
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            checkout();
        });
    } else {
        console.error('Checkout button element not found');
    }

    // Thực hiện thanh toán
    function checkout() {
        if (cartCount === 0) {
            alert('Giỏ hàng của bạn đang trống.');
            return;
        }

        alert('Thanh toán thành công! Cảm ơn bạn đã mua sắm.');

        cart = {};
        cartCount = 0;
        updateCartDisplay();
        updateCartModal();
        localStorage.removeItem('cart');
    }

    // Xử lý sự kiện form đăng ký
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            document.getElementById('signupSuccessMessage').classList.remove('d-none');
            setTimeout(function() {
                document.getElementById('signupSuccessMessage').classList.add('d-none');
                var signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
                signupModal.hide();
            }, 2000);
        });
    } else {
        console.error('Signup form element not found');
    }

    // Xử lý sự kiện form đăng nhập
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            document.getElementById('loginSuccessMessage').classList.remove('d-none');
            setTimeout(function() {
                document.getElementById('loginSuccessMessage').classList.add('d-none');
                var loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                loginModal.hide();
            }, 2000);
        });
    } else {
        console.error('Login form element not found');
    }

    // Xử lý sự kiện form tìm kiếm
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn form gửi đi
            const query = document.getElementById('searchInput').value.toLowerCase();
            searchAndHighlight(query);
        });
    } else {
        console.error('Search form element not found');
    }

    // Tìm kiếm và highlight kết quả
    function searchAndHighlight(query) {
        const elements = document.querySelectorAll('body *:not(script):not(style)');
        let matchFound = false;
        let firstMatch = null;

        elements.forEach(element => {
            if (element.children.length === 0 && element.textContent.toLowerCase().includes(query)) {
                if (!firstMatch) {
                    firstMatch = element;
                }
                element.classList.add('highlight');
                setTimeout(() => element.classList.remove('highlight'), 2000);
                matchFound = true;
            }
        });

        if (!matchFound) {
            alert('Không tìm thấy kết quả nào phù hợp.');
        } else if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
    // Xử lý các bộ đếm
    $(document).ready(function() {
        console.log("jQuery document ready.");
        // Tăng số đếm với hiệu ứng
        $('.count').each(function() {
            var $this = $(this);
            var target = parseInt($this.attr('data-target'));
            console.log("Element: ", $this, "Target: ", target); // Log phần tử và giá trị đích
            var count = 0;
            var speed = 200; // Càng nhỏ càng chậm
            var inc = target / speed;
    
            function updateCount() {
                if (count < target) {
                    count += inc;
                    $this.text(Math.ceil(count));
                    setTimeout(updateCount, 10); // Thay đổi thành 10 để dễ thấy hiệu ứng hơn
                } else {
                    $this.text(target);
                    console.log("Final count: ", target); // Log giá trị cuối cùng
                }
            }
    
            updateCount();
        });
    });
    
    
    
    


