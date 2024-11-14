$(document).ready(function () {
    $("#userstable").dataTable({
        order: [],
        columnDefs: [{ orderable: false, targets: [0, 7] }]
    });

    $("#roletable").dataTable({
        order: [],
        columnDefs: [{ orderable: false, targets: [2] }]
    })

    $("#categorytable").dataTable({
        order: [],
        columnDefs: [{ orderable: false, targets: [0, 3] }]
    })

    $("#productstable").dataTable({
        order: [],
        columnDefs: [{ orderable: false, targets: [0, 6] }]
    })

    $("#inovicetable").dataTable({
        order: [],
        columnDefs: [{ orderable: false, targets: [8] }]
    });

    $("#discounttable").dataTable({
        order: [],
        columnDefs: [{ orderable: false, targets: [0, 7] }]
    });

    $("#inovicedetailstable").dataTable({
        order: [],
        columnDefs: [{ orderable: false, targets: [0] }]
    });


    $("#privacy_policy").summernote({
        placeholder: "Write your content here",
        height: 70,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ]
    });

    $("#term_condition").summernote({
        placeholder: "Write your content here",
        height: 70,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ]
    });
});