// Sample data
const articlesData = [
    { id: 1, title: "Global Climate Summit Reaches Historic Agreement", category: "Politics", author: "Jane Smith", status: "Published", published: "2 hours ago" },
    { id: 2, title: "Tech Giants Announce New AI Partnership", category: "Technology", author: "Robert Johnson", status: "Draft", published: "5 hours ago" },
    { id: 3, title: "Local Sports Team Wins Championship", category: "Sports", author: "Mike Williams", status: "Published", published: "1 day ago" },
    { id: 4, title: "New Economic Policy Impacts Markets", category: "Business", author: "Sarah Miller", status: "Pending", published: "2 days ago" },
    { id: 5, title: "Breakthrough in Medical Research", category: "Health", author: "David Wilson", status: "Published", published: "3 days ago" }
];

const usersData = [
    { name: "John Doe", email: "john@newschannel.com", role: "Admin", lastActive: "Just now", status: "Active" },
    { name: "Jane Smith", email: "jane@newschannel.com", role: "Editor", lastActive: "10 min ago", status: "Active" },
    { name: "Robert Johnson", email: "robert@newschannel.com", role: "Reporter", lastActive: "30 min ago", status: "Active" },
    { name: "Sarah Miller", email: "sarah@newschannel.com", role: "Editor", lastActive: "1 hour ago", status: "Active" },
    { name: "Mike Williams", email: "mike@newschannel.com", role: "Video Editor", lastActive: "2 hours ago", status: "Away" },
    { name: "David Wilson", email: "david@newschannel.com", role: "Reporter", lastActive: "5 hours ago", status: "Active" }
];

const mediaData = [
    { name: "climate-summit.jpg", type: "image", size: "2.4 MB" },
    { name: "earthquake-map.png", type: "image", size: "1.8 MB" },
    { name: "morning-news-intro.mp4", type: "video", size: "45.2 MB" },
    { name: "sports-trophy.jpg", type: "image", size: "3.1 MB" },
    { name: "interview-exclusive.mov", type: "video", size: "120.5 MB" },
    { name: "weather-chart.png", type: "image", size: "1.2 MB" }
];

// DOM Elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.sidebar-nav a');
const roleContents = document.querySelectorAll('.role-content');
const recentArticles = document.getElementById('recentArticles');
const articlesTable = document.getElementById('articlesTable');
const usersTable = document.getElementById('usersTable');
const mediaGrid = document.getElementById('mediaGrid');

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function () {
    // Populate recent articles
    populateRecentArticles();

    // Populate articles table
    populateArticlesTable();

    // Populate users table
    populateUsersTable();

    // Populate media grid
    populateMediaGrid();

    // Set up event listeners
    setupEventListeners();

    // Initialize TinyMCE (commented out as we don't have API key)
    // initEditor();
});

// Populate recent articles list
function populateRecentArticles() {
    recentArticles.innerHTML = '';

    articlesData.forEach(article => {
        const li = document.createElement('li');
        li.className = 'article-item';

        const statusClass = article.status.toLowerCase();

        li.innerHTML = `
                    <div class="article-status ${statusClass}"></div>
                    <div class="article-info">
                        <div class="article-title">${article.title}</div>
                        <div class="article-meta">
                            ${article.category} • ${article.author} • ${article.published}
                        </div>
                    </div>
                    <div class="article-actions">
                        <button class="btn btn-sm btn-outline-primary">Edit</button>
                        <button class="btn btn-sm btn-outline-success">View</button>
                    </div>
                `;

        recentArticles.appendChild(li);
    });
}

// Populate articles table
function populateArticlesTable() {
    articlesTable.innerHTML = '';

    articlesData.forEach(article => {
        const row = document.createElement('tr');

        let statusBadge = '';
        if (article.status === 'Published') {
            statusBadge = '<span class="badge bg-success">Published</span>';
        } else if (article.status === 'Draft') {
            statusBadge = '<span class="badge bg-secondary">Draft</span>';
        } else {
            statusBadge = '<span class="badge bg-warning">Pending</span>';
        }

        row.innerHTML = `
                    <td>${article.title}</td>
                    <td><span class="badge bg-light text-dark">${article.category}</span></td>
                    <td>${article.author}</td>
                    <td>${statusBadge}</td>
                    <td>${article.published}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary">Edit</button>
                        <button class="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                `;

        articlesTable.appendChild(row);
    });
}

// Populate users table
function populateUsersTable() {
    usersTable.innerHTML = '';

    usersData.forEach(user => {
        const row = document.createElement('tr');

        let roleBadge = '';
        if (user.role === 'Admin') {
            roleBadge = '<span class="badge bg-danger">Admin</span>';
        } else if (user.role === 'Editor') {
            roleBadge = '<span class="badge bg-primary">Editor</span>';
        } else if (user.role === 'Reporter') {
            roleBadge = '<span class="badge bg-info">Reporter</span>';
        } else {
            roleBadge = '<span class="badge bg-secondary">Video Editor</span>';
        }

        let statusBadge = '';
        if (user.status === 'Active') {
            statusBadge = '<span class="badge bg-success">Active</span>';
        } else {
            statusBadge = '<span class="badge bg-warning">Away</span>';
        }

        row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${roleBadge}</td>
                    <td>${user.lastActive}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary">Edit</button>
                        <button class="btn btn-sm btn-outline-warning">Reset Pass</button>
                    </td>
                `;

        usersTable.appendChild(row);
    });
}

// Populate media grid
function populateMediaGrid() {
    mediaGrid.innerHTML = '';

    mediaData.forEach(media => {
        const div = document.createElement('div');
        div.className = 'media-item';

        let icon = 'bi-file-image';
        if (media.type === 'video') {
            icon = 'bi-play-btn';
        }

        div.innerHTML = `
                    <div class="media-thumbnail">
                        <i class="bi ${icon}"></i>
                    </div>
                    <div class="media-info">
                        <div class="media-name">${media.name}</div>
                        <div class="media-size">${media.size}</div>
                    </div>
                `;

        mediaGrid.appendChild(div);
    });
}

// Initialize TinyMCE editor
function initEditor() {
    tinymce.init({
        selector: '#articleEditor',
        height: 300,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    });
}

// Set up event listeners
function setupEventListeners() {
    // Toggle sidebar on mobile
    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('active');
    });

    // Handle sidebar navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Get the section to show
            const section = this.getAttribute('data-section');

            // Hide all role content sections
            roleContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show the selected section
            document.getElementById(`${section}Content`).classList.add('active');

            // Close sidebar on mobile after clicking a link
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Handle notification button click
    document.getElementById('notificationBtn').addEventListener('click', function () {
        alert('Notifications panel would open here');
    });

    // Handle alert button click
    document.getElementById('alertBtn').addEventListener('click', function () {
        const modal = new bootstrap.Modal(document.getElementById('breakingNewsModal'));
        modal.show();
    });

    // Category tag clicks
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.addEventListener('click', function () {
            document.querySelectorAll('.category-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}