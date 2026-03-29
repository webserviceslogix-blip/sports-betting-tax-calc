export default function AuthorBio() {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mt-10">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
          <span className="text-primary font-bold text-xl">MR</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900">Michael Rivera, EA</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
              Tax Expert
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Michael is an IRS Enrolled Agent (EA) specializing in gambling and
            sports betting taxation. With over 12 years of experience in tax
            preparation and advisory, he has helped hundreds of professional and
            recreational gamblers navigate complex federal and state tax
            obligations. Michael reviews all tax calculations and editorial
            content on BetTaxCalc for accuracy.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            IRS Enrolled Agent | Member, National Association of Enrolled Agents (NAEA)
          </p>
        </div>
      </div>
    </div>
  );
}
