const { stripIndent, source } = require('common-tags')

function template8({ profile, schools, jobs, skills, projects }) {
  return stripIndent`
    ${generateCommentHeader()}
    % The font could be set to Windows-specific Calibri by using the 'calibri' option
    \\documentclass[a4paper]{mcdowellcv}

    % For mathematical symbols
    \\usepackage{amsmath}

    ${generateProfileSection(profile)}

    \\begin{document}

      % Print the header
      \\makeheader

      ${generateEducationSection(schools)}
      ${generateExperienceSection(jobs)}

      \\begin{cvsection}{Projects}
        \\begin{cvsubsection}{}{}{}
            \\begin{itemize}
              \\item \\textbf{Resume Generator} (https://latexresu.me). A webapp for generating LaTeX resumes from form data (including this one).  Node.js, Koa, React, Redux
              \\item \\textbf{Flow Timer} (https://flowtimer.com). A modern speedcubing app with a scrambler, timer, and analyzer for cubing statistics.  Node.js, Koa, React, Redux
              \\item \\textbf{Reddit Image Scraper} (github.com/saadq/reddit-scraper).  A web app that lets you view a collage of images/videos from a subreddit. Ruby, Sinatra
            \\end{itemize}
          \\end{cvsubsection}
      \\end{cvsection}

      \\begin{cvsection}{Skills}
        \\begin{cvsubsection}{}{}{}
          \\begin{itemize}
            \\item Languages: C++; C; Java; Objective-C; C\\#.NET; SQL; JavaScript; XSLT; XML (XSD) Schema
            \\item Frameworks: Visual Studio; Microsoft SQL Server; Eclipse; XCode; Interface Builder
          \\end{itemize}
        \\end{cvsubsection}
      \\end{cvsection}

    \\end{document}
  `
}

function generateProfileSection(profile) {
  if (!profile) {
    return ''
  }

  const { fullName, email, phoneNumber, address, link } = profile

  let addressLine = ''
  let contactsLine = ''

  if (address && phoneNumber) {
    addressLine = `\\address{${address} \\linebreak ${phoneNumber}}`
  } else if (address || phoneNumber) {
    addressLine = `\\address{${address || phoneNumber}}`
  }

  if (email && link) {
    contactsLine = `\\contacts{${email} \\linebreak ${link}}`
  } else if (email || link) {
    contactsLine = `\\contacts{${email || link}}`
  }

  return `
    % Set applicant's personal data for header
    \\name{${fullName || ''}}
    ${addressLine}
    ${contactsLine}
  `
}

function generateEducationSection(schools) {
  if (!schools) {
    return ''
  }

  return source`
    \\begin{cvsection}{Education}
      ${schools.map(school => {
        const { name, degree, major, gpa, location, graduationDate } = school

        let degreeLine = ''

        if (degree && major) {
          degreeLine = `${degree} in ${major}.`
        } else if (degree || major) {
          degreeLine = (degree || major) + '.'
        }

        if (gpa) {
          degreeLine += ` GPA: ${gpa}`
        }

        return stripIndent`
          \\begin{cvsubsection}{${location || ''}}{${name || ''}}{${graduationDate || ''}}
            \\begin{itemize}
              \\item ${degreeLine}
            \\end{itemize}
          \\end{cvsubsection}
        `
      })}
    \\end{cvsection}
  `
}

function generateExperienceSection(jobs) {
  if (!jobs) {
    return ''
  }

  return source`
    \\begin{cvsection}{Experience}
      ${jobs.map(job => {
        const { name, title, location, startDate, endDate, duties } = job

        let dateRange = ''
        let dutyLines = ''

        if (startDate && endDate) {
          dateRange = `${startDate} -- ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} -- Present`
        } else {
          dateRange = endDate
        }

        if (duties) {
          dutyLines = source`
            \\begin{itemize}%
              ${duties.map(duty => `\\item ${duty}`)}
            \\end{itemize}
          `
        }

        return stripIndent`
          \\begin{cvsubsection}{${title || ''}}{${name || ''}}{${dateRange}}
            ${location || ''}
            ${dutyLines || ''}
          \\end{cvsubsection}
        `
      })}
    \\end{cvsection}
  `
}

function generateCommentHeader() {
  return stripIndent`
    %% The MIT License (MIT)
    %%
    %% Copyright (c) 2015 Daniil Belyakov
    %%
    %% Permission is hereby granted, free of charge, to any person obtaining a copy
    %% of this software and associated documentation files (the "Software"), to deal
    %% in the Software without restriction, including without limitation the rights
    %% to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    %% copies of the Software, and to permit persons to whom the Software is
    %% furnished to do so, subject to the following conditions:
    %%
    %% The above copyright notice and this permission notice shall be included in all
    %% copies or substantial portions of the Software.
    %%
    %% THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    %% IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    %% FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    %% AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    %% LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    %% OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    %% SOFTWARE.
  `
}

module.exports = template8
