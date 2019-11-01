const elements = {
    job_title: {
        container: ".job-title",
        element: null
    },
    summary: {
        container: ".summary-section",
        element: null
    },

    "experience.title": {
        container: ".experience-section",
        element: '' +
            '<div class="entry entry-title {0}">' +
            '    <div class="entry-icon"></div>' +
            '    <div class="entry-body">' +
            '        <p>{1}</p>' +
            '    </div>' +
            '</div>',
    },

    "experience.company": {
        container: ".experience-section",
        element: '' +
            '<div class="entry entry-subtitle">' +
            '    <div class="entry-body">' +
            '        <p>{0}</p>' +
            '    </div>' +
            '</div>'
    },

    "experience.item": {
        container: ".experience-section",
        element: '' +
            '<div class="entry">' +
            '    <div class="entry-icon"></div>' +
            '    <div class="entry-body">' +
            '        <p>{0}</p>' +
            '    </div>' +
            '</div>'
    },

    soft_skills: {
        container: ".soft-skills-section",
        element: '<div class="soft-skill">{0}</div>'
    },

    hard_skills: {
        container: ".hard-skills-section",
        element: '' +
            '<strong>{0}:</strong>' +
            '<p>{1}</p>'
    },

    interests: {
        container: ".interests-section",
        element: '<div class="interest">{0}</div>'
    },

    "education.title": {
        container: ".education-section",
        element: '' +
            '<div class="entry">' +
            '    <div class="entry-icon"></div>' +
            '    <div class="entry-body">' +
            '        <p>{0}</p>' +
            '    </div>' +
            '</div>',
    },

    "education.university": {
        container: ".education-section",
        element: '' +
            '<div class="entry entry-subtitle">' +
            '    <div class="entry-body">' +
            '        <p>{0}</p>' +
            '    </div>' +
            '</div>'
    },

    "education.item": {
        container: ".education-section",
        element: '' +
            '<div class="entry">' +
            '    <div class="entry-body">' +
            '        <p class="mt-2">{0}</p>' +
            '    </div>' +
            '</div>',
    },


};


if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

function appendElement(container, el, content) {
    if (!el) {
        $(container).text(content)
    } else {
        $(container).append($(el.format(content)))
    }
}

function appendElementWithExtraParam(container, el, content, extra_param) {
    const new_el = el.format(extra_param).replace('{1}', '{0}');
    appendElement(container, new_el, content)
}

function setupJobTitle(resume) {
    appendElement(elements.job_title.container, elements.job_title.element, resume.job_title)
}

function setupSummary(resume) {
    appendElement(elements.summary.container, elements.summary.element, resume.summary)
}

function setupExperience(resume) {
    $.each(resume.experience, function (index, value) {
        appendElementWithExtraParam(elements["experience.title"].container, elements["experience.title"].element, value.title, value.className);
        appendElement(elements["experience.company"].container, elements["experience.company"].element, value.company);
        $.each(value.items, function (i, item) {
            appendElement(elements["experience.item"].container, elements["experience.item"].element, item);
        })
    })
}

function setupSoftSkills(resume) {
    $.each(resume.soft_skills, function (index, value) {
        appendElement(elements.soft_skills.container, elements.soft_skills.element, value);
    })
}

function setupHardSkills(resume) {
    for (const entry of Object.entries(resume.hard_skills)) {
        const topic = entry[0];
        const skills = entry[1].join(' • ');
        appendElementWithExtraParam(elements.hard_skills.container, elements.hard_skills.element, skills, topic)
    }
}

function setupInterests(resume) {
    $.each(resume.interests, function (index, value) {
        appendElement(elements.interests.container, elements.interests.element, value);
    })
}

function setupEducation(resume) {
    $.each(resume.education, function (index, value) {
        appendElement(elements["education.title"].container, elements["education.title"].element, value.title);
        appendElement(elements["education.university"].container, elements["education.university"].element, value.university);
        $.each(value.items, function (i, item) {
            appendElement(elements["education.item"].container, elements["education.item"].element, item);
        })
    })
}

function setup(resume) {
    setupJobTitle(resume);
    setupSummary(resume);
    setupExperience(resume);
    setupSoftSkills(resume);
    setupHardSkills(resume);
    setupInterests(resume);
    setupEducation(resume);
}